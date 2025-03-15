import random
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .models import budgetbuild, gamingbuilds, workstations, professional, enthusiast, CPU, GPU, Motherboard, RAM, Storage, PSU

MINIMUM_SPECS = {
    "Student PC": {"cpu_cores": 2, "gpu_vram": 1, "ram_capacity": 4},
    "Office Workstation": {"cpu_cores": 4, "gpu_vram": 2, "ram_capacity": 8},
    "Casual Home PC": {"cpu_cores": 4, "gpu_vram": 2, "ram_capacity": 8},
    "Low-Cost Gaming PC": {"cpu_cores": 4, "gpu_vram": 4, "ram_capacity": 8},
    "Entry-Level Gaming PC": {"cpu_cores": 4, "gpu_vram": 4, "ram_capacity": 8},
    "Mid-Range Gaming PC": {"cpu_cores": 6, "gpu_vram": 6, "ram_capacity": 16},
    "High-End Gaming PC": {"cpu_cores": 8, "gpu_vram": 8, "ram_capacity": 32},
    "Competitive eSports PC": {"cpu_cores": 6, "gpu_vram": 6, "ram_capacity": 16},
    "Streaming & Gaming Hybrid PC": {"cpu_cores": 8, "gpu_vram": 8, "ram_capacity": 32},
    "Video Editing Workstation": {"cpu_cores": 8, "gpu_vram": 8, "ram_capacity": 32},
    "3D Rendering & Animation": {"cpu_cores": 8, "gpu_vram": 8, "ram_capacity": 32},
    "CAD & Engineering": {"cpu_cores": 8, "gpu_vram": 8, "ram_capacity": 32},
    "Music Production": {"cpu_cores": 4, "gpu_vram": 2, "ram_capacity": 16},
    "AI & Machine Learning": {"cpu_cores": 8, "gpu_vram": 8, "ram_capacity": 32},
    "Software Development": {"cpu_cores": 4, "gpu_vram": 2, "ram_capacity": 16},
    "Business Workstation": {"cpu_cores": 4, "gpu_vram": 2, "ram_capacity": 16},
    "Financial Trading PC": {"cpu_cores": 4, "gpu_vram": 2, "ram_capacity": 16},
    "Server & Home Lab PC": {"cpu_cores": 8, "gpu_vram": 8, "ram_capacity": 32},
    "Medical & Scientific Computing PC": {"cpu_cores": 8, "gpu_vram": 8, "ram_capacity": 32},
    "Mini ITX Compact PC": {"cpu_cores": 4, "gpu_vram": 4, "ram_capacity": 16},
    "Energy-Efficient PC": {"cpu_cores": 4, "gpu_vram": 2, "ram_capacity": 8},
}

@api_view(['POST'])
def get_pc_recommendation(request):
    # Extract answers from the request
    answers = request.data.get('answers', [])
    if not answers:
        return Response({'error': 'No answers provided'}, status=400)

    # Initialize variables to store the build type and budget
    build_type = answers[0].get('answer')
    sub_category = answers[1].get('answer')
    budget = answers[2].get('answer')

    # Handle custom budget
    if 'Custom: ' in budget:
        budget = budget.replace('Custom: ', '')

    # Determine the appropriate model based on the build type
    model_map = {
        'Budget PC Builds': budgetbuild,
        'Gaming PC Builds': gamingbuilds,
        'Workstation PC Builds': workstations,
        'Professional & Enterprise': professional,
        'Enthusiast & Niche Builds': enthusiast
    }

    model = model_map.get(build_type)

    if not model:
        return Response({'error': 'Invalid build type'}, status=400)

    # Fetch the matching builds from the database
    builds = model.objects.filter(name=sub_category, price_inr__range=parse_budget_range(budget))

    if not builds.exists():
        # If no builds found, use the alternative recommendation logic
        max_budget = int(budget.replace('₹', '').replace(',', ''))
        specs = MINIMUM_SPECS.get(sub_category, {"cpu_cores": 4, "gpu_vram": 2, "ram_capacity": 8})

        budget_distribution = {
            "cpu": 0.25 * max_budget,
            "gpu": 0.30 * max_budget,
            "motherboard": 0.15 * max_budget,
            "ram": 0.10 * max_budget,
            "storage": 0.10 * max_budget,
            "psu": 0.10 * max_budget,
        }

        cpu = CPU.objects.filter(core_count__gte=specs['cpu_cores'], price_inr__lte=budget_distribution["cpu"]).order_by("-rating").first()
        gpu = GPU.objects.filter(vram_gb__gte=specs['gpu_vram'], price_inr__lte=budget_distribution["gpu"]).order_by("-rating").first()
        ram = RAM.objects.filter(capacity_gb__gte=specs['ram_capacity'], price_inr__lte=budget_distribution["ram"]).order_by("-rating").first()
        storage = Storage.objects.filter(price_inr__lte=budget_distribution["storage"]).order_by("-rating").first()
        psu = PSU.objects.filter(price_inr__lte=budget_distribution["psu"]).order_by("-rating").first()

        if not cpu or not gpu or not ram or not storage or not psu:
            return Response({"error": "No compatible PC build found within the given budget."},status=400)

        motherboard = Motherboard.objects.filter(socket_type=cpu.socket_type, price_inr__lte=budget_distribution["motherboard"]).order_by("-rating").first()
        if not motherboard:
            return Response({"error": "No compatible motherboard found."})

        # Check compatibility of RAM with motherboard
        if not ram.is_compatible_with(motherboard):
            return Response({"error": "No compatible RAM found for the selected motherboard."})

        # Check compatibility of GPU with motherboard
        if not gpu.is_compatible_with(motherboard):
            return Response({"error": "No compatible GPU found for the selected motherboard."})

        total_cost = sum(filter(None, [
            cpu.price_inr, motherboard.price_inr, gpu.price_inr, 
            ram.price_inr, storage.price_inr, psu.price_inr
        ]))

        if total_cost > max_budget:
            return Response({"error": "Budget too low for recommended parts."})

        recommendation = {
            "cpu": f"{cpu.model} - ₹{cpu.price_inr}, Cores: {cpu.core_count}",
            "motherboard": f"{motherboard.model} - ₹{motherboard.price_inr}, Socket: {motherboard.socket_type}",
            "gpu": f"{gpu.model} - ₹{gpu.price_inr}, VRAM: {gpu.vram_gb}GB",
            "ram": f"{ram.model} - ₹{ram.price_inr}, Capacity: {ram.capacity_gb}GB",
            "storage": f"{storage.model} - ₹{storage.price_inr}, Capacity: {storage.capacity_gb}GB",
            "psu": f"{psu.model} - ₹{psu.price_inr}, Wattage: {psu.wattage}W",
            "total_cost": f"{total_cost}"
        }
        return Response(recommendation)

    # Select a random build if more than one is found
    build = random.choice(builds)

    # Prepare the recommendation response
    recommendation = {
        "cpu": build.cpu,
        "gpu": build.gpu,
        "ram": build.ram,
        "storage": build.storage,
        "psu": build.psu,
        "total_cost": build.price_inr,
    }

    return Response(recommendation)

def parse_budget_range(budget):
    """Parses the budget string and returns a tuple with the min and max price."""
    if ' - ' in budget:
        budget_range = budget.split(' - ')
        min_price = int(budget_range[0].replace('₹', '').replace(',', ''))
        max_price = int(budget_range[1].replace('₹', '').replace(',', ''))
        return (min_price, max_price)
    else:
        base_price = int(budget.replace('₹', '').replace(',', ''))
        min_price = int(base_price * 0.9)  # 10% less than the base price
        max_price = int(base_price * 1.1)  # 10% more than the base price
        return (min_price, max_price)