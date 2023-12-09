from django.contrib import admin
from .models import CustomUser, Company, CompanyInfo, ProductCategory, ProductIndustry, Product, ProductInstance


admin.site.register(CustomUser)
admin.site.register(Company)
admin.site.register(CompanyInfo)
admin.site.register(ProductCategory)
admin.site.register(ProductIndustry)
admin.site.register(Product)
admin.site.register(ProductInstance)
