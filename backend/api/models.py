# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class CPU(models.Model):
    cpu_id = models.AutoField(db_column='CPU_ID', primary_key=True)  # Field name made lowercase.
    manufacturer = models.CharField(db_column='Manufacturer', max_length=255, blank=True, null=True)  # Field name made lowercase.
    model = models.CharField(db_column='Model', max_length=100)  # Field name made lowercase.
    socket_type = models.CharField(db_column='Socket_Type', max_length=50)  # Field name made lowercase.
    core_count = models.IntegerField(db_column='Core_Count')  # Field name made lowercase.
    thread_count = models.IntegerField(db_column='Thread_Count', blank=True, null=True)  # Field name made lowercase.
    base_clock_ghz = models.DecimalField(db_column='Base_Clock_GHz', max_digits=4, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    boost_clock_ghz = models.DecimalField(db_column='Boost_Clock_GHz', max_digits=4, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    l3_cache_mb = models.IntegerField(db_column='L3_Cache_MB', blank=True, null=True)  # Field name made lowercase.
    tdp_watts = models.IntegerField(db_column='TDP_Watts', blank=True, null=True)  # Field name made lowercase.
    integrated_graphics = models.IntegerField(db_column='Integrated_Graphics', blank=True, null=True)  # Field name made lowercase.
    price_inr = models.IntegerField(db_column='Price_INR')  # Field name made lowercase.
    rating = models.FloatField(db_column='Rating')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'CPUs'


class GPU(models.Model):
    gpu_id = models.AutoField(db_column='GPU_ID', primary_key=True)  # Field name made lowercase.
    manufacturer = models.CharField(db_column='Manufacturer', max_length=255, blank=True, null=True)  # Field name made lowercase.
    model = models.CharField(db_column='Model', max_length=100)  # Field name made lowercase.
    vram_gb = models.IntegerField(db_column='VRAM_GB')  # Field name made lowercase.
    memory_type = models.CharField(db_column='Memory_Type', max_length=20, blank=True, null=True)  # Field name made lowercase.
    interface = models.IntegerField(db_column='Interface', blank=True, null=True)  # Field name made lowercase.
    price_inr = models.IntegerField(db_column='Price_INR')  # Field name made lowercase.
    rating = models.FloatField(db_column='Rating')  # Field name made lowercase.
    tdp_watts = models.IntegerField(db_column='TDP_Watts', blank=True, null=True)  # New field for TDP

    class Meta:
        managed = False
        db_table = 'GPUs'

    def is_compatible_with(self, motherboard):
        # Check if the GPU is compatible with the motherboard
        # For example, check if the motherboard has the required PCIe slot
        return motherboard.has_pcie_slot()


class Motherboard(models.Model):
    motherboard_id = models.AutoField(db_column='Motherboard_ID', primary_key=True)  # Field name made lowercase.
    manufacturer = models.CharField(db_column='Manufacturer', max_length=255, blank=True, null=True)  # Field name made lowercase.
    model = models.CharField(db_column='Model', max_length=100)  # Field name made lowercase.
    socket_type = models.CharField(db_column='Socket_Type', max_length=50)  # Field name made lowercase.
    chipset = models.CharField(db_column='Chipset', max_length=50, blank=True, null=True)  # Field name made lowercase.
    memory_slots = models.IntegerField(db_column='Memory_Slots', blank=True, null=True)  # Field name made lowercase.
    max_memory_gb = models.IntegerField(db_column='Max_Memory_GB', blank=True, null=True)  # Field name made lowercase.
    memory_type = models.CharField(db_column='Memory_Type', max_length=20, blank=True, null=True)  # Field name made lowercase.
    pcie_slots = models.CharField(db_column='PCIe_Slots', max_length=255, blank=True, null=True)  # Field name made lowercase.
    m2_slots = models.IntegerField(db_column='M2_Slots', blank=True, null=True)  # Field name made lowercase.
    sata_ports = models.IntegerField(db_column='SATA_Ports', blank=True, null=True)  # Field name made lowercase.
    form_factor = models.CharField(db_column='Form_Factor', max_length=20, blank=True, null=True)  # Field name made lowercase.
    price_inr = models.IntegerField(db_column='Price_INR')  # Field name made lowercase.
    rating = models.FloatField(db_column='Rating')  # Field name made lowercase.
    pcie_version_primary = models.IntegerField(db_column='PCIe_Version_Primary', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Motherboards'

    def has_pcie_slot(self):
        # Check if the motherboard has a PCIe slot
        # This is a simplified example; actual implementation might involve more checks
        return True  # Assume all motherboards have a PCIe slot for simplicity


class PSU(models.Model):
    psu_id = models.AutoField(db_column='PSU_ID', primary_key=True)  # Field name made lowercase.
    manufacturer = models.CharField(db_column='Manufacturer', max_length=255, blank=True, null=True)  # Field name made lowercase.
    model = models.CharField(db_column='Model', max_length=100)  # Field name made lowercase.
    wattage = models.IntegerField(db_column='Wattage')  # Field name made lowercase.
    efficiency_rating = models.CharField(db_column='Efficiency_Rating', max_length=20, blank=True, null=True)  # Field name made lowercase.
    form_factor = models.CharField(db_column='Form_Factor', max_length=20, blank=True, null=True)  # Field name made lowercase.
    modular_type = models.CharField(db_column='Modular_Type', max_length=20, blank=True, null=True)  # Field name made lowercase.
    connectors = models.CharField(db_column='Connectors', max_length=255, blank=True, null=True)  # Field name made lowercase.
    price_inr = models.IntegerField(db_column='Price_INR')  # Field name made lowercase.
    rating = models.FloatField(db_column='Rating')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PSUs'


class RAM(models.Model):
    ram_id = models.AutoField(db_column='RAM_ID', primary_key=True)  # Field name made lowercase.
    manufacturer = models.CharField(db_column='Manufacturer', max_length=255, blank=True, null=True)  # Field name made lowercase.
    model = models.CharField(db_column='Model', max_length=100)  # Field name made lowercase.
    capacity_gb = models.IntegerField(db_column='Capacity_GB')  # Field name made lowercase.
    module_count = models.IntegerField(db_column='Module_Count', blank=True, null=True)  # Field name made lowercase.
    total_capacity_gb = models.IntegerField(db_column='Total_Capacity_GB', blank=True, null=True)  # Field name made lowercase.
    memory_type = models.CharField(db_column='Memory_Type', max_length=20, blank=True, null=True)  # Field name made lowercase.
    speed_mhz = models.IntegerField(db_column='Speed_MHz', blank=True, null=True)  # Field name made lowercase.
    latency_cl = models.IntegerField(db_column='Latency_CL', blank=True, null=True)  # Field name made lowercase.
    voltage_v = models.DecimalField(db_column='Voltage_V', max_digits=3, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    rgb = models.IntegerField(db_column='RGB', blank=True, null=True)  # Field name made lowercase.
    price_inr = models.IntegerField(db_column='Price_INR')  # Field name made lowercase.
    rating = models.FloatField(db_column='Rating')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'RAMs'

    def is_compatible_with(self, motherboard):
        # Check if the RAM is compatible with the motherboard
        # For example, check if the motherboard supports the RAM type (e.g., DDR4)
        return True  # Simplified compatibility check


class Storage(models.Model):
    storage_id = models.AutoField(db_column='Storage_ID', primary_key=True)  # Field name made lowercase.
    manufacturer = models.CharField(db_column='Manufacturer', max_length=255, blank=True, null=True)  # Field name made lowercase.
    model = models.CharField(db_column='Model', max_length=100)  # Field name made lowercase.
    capacity_gb = models.IntegerField(db_column='Capacity_GB')  # Field name made lowercase.
    storage_type = models.CharField(db_column='Storage_Type', max_length=20, blank=True, null=True)  # Field name made lowercase.
    interface = models.CharField(db_column='Interface', max_length=50, blank=True, null=True)  # Field name made lowercase.
    form_factor = models.CharField(db_column='Form_Factor', max_length=20, blank=True, null=True)  # Field name made lowercase.
    read_speed_mbps = models.IntegerField(db_column='Read_Speed_MBps', blank=True, null=True)  # Field name made lowercase.
    write_speed_mbps = models.IntegerField(db_column='Write_Speed_MBps', blank=True, null=True)  # Field name made lowercase.
    price_inr = models.IntegerField(db_column='Price_INR')  # Field name made lowercase.
    rating = models.FloatField(db_column='Rating')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Storage'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'

class professional(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    cpu = models.CharField(max_length=100)
    gpu = models.CharField(max_length=100)
    ram = models.CharField(max_length=100)
    storage = models.CharField(max_length=100)
    psu = models.CharField(max_length=100)
    price_inr = models.DecimalField(max_digits=10, decimal_places=2)
    motherboard = models.CharField(max_length=100,null=True, blank=True)
    class Meta:
        db_table = "professional"
    def __str__(self):
        return self.name

class enthusiast(models.Model):
    
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    cpu = models.CharField(max_length=100)
    gpu = models.CharField(max_length=100)
    ram = models.CharField(max_length=100)
    storage = models.CharField(max_length=100)
    psu = models.CharField(max_length=100)
    price_inr = models.DecimalField(max_digits=10, decimal_places=2)
    motherboard = models.CharField(max_length=100,null=True, blank=True)
    class Meta:
        db_table = "enthusiast"
    def __str__(self):
        return self.name

class gamingbuilds(models.Model):
    
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    cpu = models.CharField(max_length=100)
    gpu = models.CharField(max_length=100)
    ram = models.CharField(max_length=100)
    storage = models.CharField(max_length=100)
    psu = models.CharField(max_length=100)
    price_inr = models.DecimalField(max_digits=10, decimal_places=2)
    motherboard = models.CharField(max_length=100,null=True, blank=True)
    class Meta:
        db_table = "gamingbuilds"
    def __str__(self):
        return self.name

class budgetbuild(models.Model):
    
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    cpu = models.CharField(max_length=100)
    gpu = models.CharField(max_length=100)
    ram = models.CharField(max_length=100)
    storage = models.CharField(max_length=100)
    psu = models.CharField(max_length=100)
    price_inr = models.DecimalField(max_digits=10, decimal_places=2)
    motherboard = models.CharField(max_length=100,null=True, blank=True)
    class Meta:
        db_table = "budgetbuild"
    def __str__(self):
        return self.name

class workstations(models.Model):
   
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    cpu = models.CharField(max_length=100)
    gpu = models.CharField(max_length=100)
    ram = models.CharField(max_length=100)
    storage = models.CharField(max_length=100)
    psu = models.CharField(max_length=100)
    # cabinet = models.CharField(max_length=100)
    price_inr = models.DecimalField(max_digits=10, decimal_places=2)
    motherboard = models.CharField(max_length=100,null=True, blank=True)
    class Meta:
        db_table = "workstations"
    def __str__(self):
        return self.name