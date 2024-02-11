from django.contrib import admin
from .models import CustomUser, StaffProfile, Company, CompanyInfo, ProductCategory, Product, ProductInstance, CotizationLog, Review


admin.site.register(CustomUser)
admin.site.register(StaffProfile)
admin.site.register(Company)
admin.site.register(CompanyInfo)
admin.site.register(ProductCategory)
admin.site.register(Product)
admin.site.register(ProductInstance)
admin.site.register(CotizationLog)
admin.site.register(Review)

