from django.conf.urls import url, include
from rest_framework import routers
from .import views


router = routers.DefaultRouter()
router.register(r'todos', views.TodoViewSet)
router.register(r'users', views.UserViewSet)


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^api/', include(router.urls, namespace='api')),
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework'))
]
