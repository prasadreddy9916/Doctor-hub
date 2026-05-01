from django.urls import path
from .views import ContentListCreateView, ContentDetailView,MyAccessContentView

urlpatterns = [
    path('', ContentListCreateView.as_view(), name='content-list'),
    path('my-access/', MyAccessContentView.as_view()),
    path('<int:pk>/', ContentDetailView.as_view(), name='content-detail'),
]