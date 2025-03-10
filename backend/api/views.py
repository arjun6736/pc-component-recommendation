from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .models import CPU, GPU, Motherboard, RAM, Storage, PSU

@api_view(['POST'])
def recommend_pc(request):
    answers = request.data.get('answers', [])

    main_use = next((a['answer'] for a in answers if a['questionId'] == 1), None)
    budget = next((a['answer'] for a in answers if a['questionId'] == 4), None)

    budget_map = {
        "Below ₹30,000": (0, 30000),
        "₹30,000 – ₹60,000": (30000, 60000),
        "₹60,000 – ₹1,00,000": (60000, 100000),
        "₹1,00,000+": (100000, float('inf'))
    }
    min_budget, max_budget = budget_map.get(budget, (0, float('inf')))

    recommended_specs = {
        "Gaming": {"cpu_cores": 6, "gpu_vram": 6, "ram_capacity": 16},
        "Office & Browsing": {"cpu_cores": 4, "gpu_vram": 2, "ram_capacity": 8},
        "Video Editing": {"cpu_cores": 8, "gpu_vram": 8, "ram_capacity": 32},
        "Programming": {"cpu_cores": 6, "gpu_vram": 2, "ram_capacity": 16},
        "3D Modeling": {"cpu_cores": 8, "gpu_vram": 8, "ram_capacity": 32},
        "Streaming": {"cpu_cores": 8, "gpu_vram": 6, "ram_capacity": 16},
    }
    specs = recommended_specs.get(main_use, {"cpu_cores": 4, "gpu_vram": 2, "ram_capacity": 8})

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
        return Response({"error": "No compatible PC build found within the given budget."})

    motherboard = Motherboard.objects.filter(socket_type=cpu.socket_type, price_inr__lte=budget_distribution["motherboard"]).order_by("-rating").first()
    if not motherboard:
        return Response({"error": "No compatible motherboard found."})

    total_cost = sum(filter(None, [
        cpu.price_inr, motherboard.price_inr, gpu.price_inr, 
        ram.price_inr, storage.price_inr, psu.price_inr
    ]))

    if total_cost > max_budget:
        return Response({"error": "Budget too low for recommended parts."})

    return Response({
        "cpu": {"name": cpu.model, "price": cpu.price_inr, "cores": cpu.core_count},
        "motherboard": {"name": motherboard.model, "price": motherboard.price_inr, "socket": motherboard.socket_type},
        "gpu": {"name": gpu.model, "price": gpu.price_inr, "vram": gpu.vram_gb},
        "ram": {"name": ram.model, "price": ram.price_inr, "capacity": ram.capacity_gb},
        "storage": {"name": storage.model, "price": storage.price_inr, "capacity": storage.capacity_gb},
        "psu": {"name": psu.model, "price": psu.price_inr, "wattage": psu.wattage},
        "total_cost": total_cost
    })

