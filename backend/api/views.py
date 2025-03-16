import random
import logging
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import budgetbuild, gamingbuilds, workstations, professional, enthusiast, CPU, GPU, Motherboard, RAM, Storage, PSU

# Configure logging
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

# Minimum specifications for each sub-category
MINIMUM_SPECS = {
    "Budget Build": {"cpu_cores": 4, "gpu_vram": 2, "ram_capacity": 8},
    "Mid-Range Gaming": {"cpu_cores": 6, "gpu_vram": 6, "ram_capacity": 16},
    "High-End Gaming": {"cpu_cores": 8, "gpu_vram": 8, "ram_capacity": 32},
    "Workstation": {"cpu_cores": 12, "gpu_vram": 8, "ram_capacity": 64},
}

# Budget distribution for each component type
BUDGET_DISTRIBUTION = {
    "cpu": 0.25,
    "gpu": 0.30,
    "motherboard": 0.15,
    "ram": 0.10,
    "storage": 0.10,
    "psu": 0.10,
}

@api_view(['POST'])
def get_pc_recommendation(request):
    try:
        # Step 1: Validate input
        answers = request.data.get('answers', [])
        if not answers:
            return Response({'error': 'No answers provided'}, status=400)

        build_type = answers[0].get('answer')
        sub_category = answers[1].get('answer')
        budget = answers[2].get('answer')
        print(build_type, sub_category, budget)
        # Step 2: Parse budget
        if 'Custom: ' in budget:
            budget = budget.replace('Custom: ', '')
            max_budget = int(budget.replace('₹', '').replace(',', ''))

        # Step 3: Check if pre-defined builds exist
        model_map = {
            'Budget PC Builds': budgetbuild,
            'Gaming PC Builds': gamingbuilds,
            'Workstation PC Builds': workstations,
            'Professional & Enterprise': professional,
            'Enthusiast & Niche Builds': enthusiast,
        }
        model = model_map.get(build_type)
        if not model:
            return Response({'error': 'Invalid build type'}, status=400)

        builds = model.objects.filter(name=sub_category, price_inr__range=parse_budget_range(budget))
        if builds.exists():
            build = random.choice(builds)
            recommendation = {
                "cpu": build.cpu,
                "motherboard": build.motherboard,
                "gpu": build.gpu,
                "ram": build.ram,
                "storage": build.storage,
                "psu": build.psu,
                "total_cost": build.price_inr,
            }
            return Response(recommendation)

        # Step 4: Generate dynamic build
        specs = MINIMUM_SPECS.get(sub_category, {"cpu_cores": 4, "gpu_vram": 2, "ram_capacity": 8})
        recommendation = generate_dynamic_build(max_budget, specs)
        if recommendation:
            return Response(recommendation)
        else:
            return Response({"error": "No compatible PC build found within the given budget."}, status=400)

    except ValueError as e:
        logger.error(f"ValueError: {str(e)}")
        return Response({"error": "Invalid budget format. Please provide a valid budget."}, status=400)
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        return Response({"error": "An unexpected error occurred. Please try again later."}, status=500)

def generate_dynamic_build(max_budget, specs):
    try:
        # Step 1: Find CPU meeting specs
        cpu_budget = max_budget * BUDGET_DISTRIBUTION["cpu"]
        cpus = CPU.objects.filter(core_count__gte=specs['cpu_cores'], price_inr__lte=cpu_budget).order_by('-rating')
        for cpu in cpus:
            # Step 2: Find compatible motherboard
            motherboard = find_compatible_motherboard(cpu, max_budget * BUDGET_DISTRIBUTION["motherboard"])
            if not motherboard:
                continue

            # Step 3: Find compatible RAM
            ram = find_compatible_ram(motherboard, max_budget * BUDGET_DISTRIBUTION["ram"], specs['ram_capacity'])
            if not ram:
                continue

            # Step 4: Find compatible GPU
            gpu = find_compatible_gpu(motherboard, max_budget * BUDGET_DISTRIBUTION["gpu"], specs['gpu_vram'])
            if not gpu:
                continue

            # Step 5: Find storage and PSU
            storage = find_storage(max_budget * BUDGET_DISTRIBUTION["storage"])
            psu = find_psu(max_budget * BUDGET_DISTRIBUTION["psu"], cpu.tdp_watts + gpu.tdp_watts + 50)  # 50W buffer
            if not storage or not psu:
                continue

            # Step 6: Calculate total cost
            total_cost = sum([cpu.price_inr, motherboard.price_inr, gpu.price_inr, ram.price_inr, storage.price_inr, psu.price_inr])
            if total_cost <= max_budget:
                return {
                    "cpu": f"{cpu.model} - ₹{cpu.price_inr}, Cores: {cpu.core_count}",
                    "motherboard": f"{motherboard.model} - ₹{motherboard.price_inr}, Socket: {motherboard.socket_type}",
                    "gpu": f"{gpu.model} - ₹{gpu.price_inr}, VRAM: {gpu.vram_gb}GB",
                    "ram": f"{ram.model} - ₹{ram.price_inr}, Capacity: {ram.capacity_gb}GB",
                    "storage": f"{storage.model} - ₹{storage.price_inr}, Capacity: {storage.capacity_gb}GB",
                    "psu": f"{psu.model} - ₹{psu.price_inr}, Wattage: {psu.wattage}W",
                    "total_cost": f"{total_cost}"
                }

        return None

    except Exception as e:
        logger.error(f"Error in generate_dynamic_build: {str(e)}")
        return None

def find_compatible_motherboard(cpu, max_budget):
    return Motherboard.objects.filter(
        socket_type=cpu.socket_type,
        price_inr__lte=max_budget
    ).order_by('-rating').first()

def find_compatible_ram(motherboard, max_budget, min_capacity):
    return RAM.objects.filter(
        memory_type=motherboard.memory_type,
        capacity_gb__gte=min_capacity,
        price_inr__lte=max_budget
    ).order_by('-rating').first()

def find_compatible_gpu(motherboard, max_budget, min_vram):
    return GPU.objects.filter(
        vram_gb__gte=min_vram,
        interface=motherboard.pcie_version_primary,
        price_inr__lte=max_budget
    ).order_by('-rating').first()

def find_storage(max_budget):
    return Storage.objects.filter(price_inr__lte=max_budget).order_by('-rating').first()

def find_psu(max_budget, min_wattage):
    return PSU.objects.filter(
        wattage__gte=min_wattage,
        price_inr__lte=max_budget
    ).order_by('-rating').first()

def parse_budget_range(budget):
    try:
        if ' - ' in budget:
            budget_range = budget.split(' - ')
            min_price = int(budget_range[0].replace('₹', '').replace(',', ''))
            max_price = int(budget_range[1].replace('₹', '').replace(',', ''))
            print(min_price, max_price)
            return (min_price, max_price)
        else:
            base_price = int(budget.replace('₹', '').replace(',', ''))
            return (int(base_price * 0.9), int(base_price * 1.1))
    except Exception as e:
        logger.error(f"Error in parse_budget_range: {str(e)}")
        return (0, 0)