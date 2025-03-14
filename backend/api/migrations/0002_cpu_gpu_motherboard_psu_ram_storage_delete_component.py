# Generated by Django 5.1.6 on 2025-03-07 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CPU',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('manufacturer', models.CharField(max_length=255)),
                ('model', models.CharField(max_length=255)),
                ('socket_type', models.CharField(max_length=50)),
                ('core_count', models.IntegerField()),
                ('thread_count', models.IntegerField()),
                ('base_clock_ghz', models.DecimalField(decimal_places=2, max_digits=4)),
                ('boost_clock_ghz', models.DecimalField(decimal_places=2, max_digits=4)),
                ('l3_cache_mb', models.IntegerField()),
                ('tdp_watts', models.IntegerField()),
                ('integrated_graphics', models.BooleanField()),
                ('price_inr', models.DecimalField(decimal_places=2, max_digits=10)),
                ('rating', models.DecimalField(decimal_places=2, max_digits=3)),
            ],
        ),
        migrations.CreateModel(
            name='GPU',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('manufacturer', models.CharField(max_length=255)),
                ('model', models.CharField(max_length=255)),
                ('vram_gb', models.IntegerField()),
                ('memory_type', models.CharField(max_length=20)),
                ('interface', models.IntegerField()),
                ('price_inr', models.DecimalField(decimal_places=2, max_digits=10)),
                ('rating', models.DecimalField(decimal_places=2, max_digits=3)),
            ],
        ),
        migrations.CreateModel(
            name='Motherboard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('manufacturer', models.CharField(max_length=255)),
                ('model', models.CharField(max_length=255)),
                ('socket_type', models.CharField(max_length=50)),
                ('chipset', models.CharField(max_length=50)),
                ('memory_slots', models.IntegerField()),
                ('max_memory_gb', models.IntegerField()),
                ('memory_type', models.CharField(max_length=20)),
                ('pcie_slots', models.CharField(max_length=255)),
                ('m2_slots', models.IntegerField()),
                ('sata_ports', models.IntegerField()),
                ('form_factor', models.CharField(max_length=20)),
                ('price_inr', models.DecimalField(decimal_places=2, max_digits=10)),
                ('rating', models.DecimalField(decimal_places=2, max_digits=3)),
            ],
        ),
        migrations.CreateModel(
            name='PSU',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('manufacturer', models.CharField(max_length=255)),
                ('model', models.CharField(max_length=255)),
                ('wattage', models.IntegerField()),
                ('efficiency_rating', models.CharField(max_length=20)),
                ('form_factor', models.CharField(max_length=20)),
                ('modular_type', models.CharField(max_length=20)),
                ('connectors', models.TextField()),
                ('price_inr', models.DecimalField(decimal_places=2, max_digits=10)),
                ('rating', models.DecimalField(decimal_places=2, max_digits=3)),
            ],
        ),
        migrations.CreateModel(
            name='RAM',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('manufacturer', models.CharField(max_length=255)),
                ('model', models.CharField(max_length=255)),
                ('capacity_gb', models.IntegerField()),
                ('module_count', models.IntegerField()),
                ('memory_type', models.CharField(max_length=20)),
                ('speed_mhz', models.IntegerField()),
                ('latency_cl', models.IntegerField()),
                ('voltage_v', models.DecimalField(decimal_places=2, max_digits=3)),
                ('rgb', models.BooleanField()),
                ('price_inr', models.DecimalField(decimal_places=2, max_digits=10)),
                ('rating', models.DecimalField(decimal_places=2, max_digits=3)),
            ],
        ),
        migrations.CreateModel(
            name='Storage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('manufacturer', models.CharField(max_length=255)),
                ('model', models.CharField(max_length=255)),
                ('capacity_gb', models.IntegerField()),
                ('storage_type', models.CharField(max_length=20)),
                ('interface', models.CharField(max_length=50)),
                ('form_factor', models.CharField(max_length=20)),
                ('read_speed_mbps', models.IntegerField()),
                ('write_speed_mbps', models.IntegerField()),
                ('price_inr', models.DecimalField(decimal_places=2, max_digits=10)),
                ('rating', models.DecimalField(decimal_places=2, max_digits=3)),
            ],
        ),
        migrations.DeleteModel(
            name='Component',
        ),
    ]
