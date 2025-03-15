from django.urls import path
from . import views

urlpatterns = [
    # path("recommend/",views.recommend_pc,name="recommend"),
    path("recommend_build/",views.get_pc_recommendation,name="recommend_build")
]
