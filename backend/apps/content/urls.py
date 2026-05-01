from django.urls import path
from .views import ContentListCreateView, ContentDetailView, MyAccessContentView, ContentTypeCountView,PublicHomeStatsView

urlpatterns = [
    path('', ContentListCreateView.as_view(), name='content-list'),
    path('my-access/', MyAccessContentView.as_view()),
    path('type-counts/', ContentTypeCountView.as_view(), name='content-type-counts'),
    path('<int:pk>/', ContentDetailView.as_view(), name='content-detail'),
    path('public-stats/', PublicHomeStatsView.as_view(), name='public_home_stats'),
    
     
]