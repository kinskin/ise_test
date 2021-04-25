from django.http import HttpResponse
from django.core.exceptions import PermissionDenied
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from drf_yasg import openapi
from django.conf import settings
from camel_backend.constant import CAMELLO_MODULE
from camel_backend import permissions as gp
from camel_backend.utils import response_success, swagger_args, get_pagination_params, GROUPS, get_sort_params
from robots import permissions as cp  # cp: custom permission
from robots.serializers import RobotSerializer, RobotHeartBeatSerializer, MapSerializer
from robots.services import RobotService

SWAGGER_GROUP_ROBOT = 'robots'

@swagger_auto_schema(
    **swagger_args(
        'get', SWAGGER_GROUP_ROBOT, RobotSerializer(many=True)),
    manual_parameters=[
        openapi.Parameter('company_id', openapi.IN_QUERY, type=openapi.TYPE_INTEGER),
        openapi.Parameter('status', openapi.IN_QUERY, type=openapi.TYPE_INTEGER),
        openapi.Parameter('dispatch_hub_id', openapi.IN_QUERY, type=openapi.TYPE_INTEGER),
        openapi.Parameter('keyword', openapi.IN_QUERY, type=openapi.TYPE_STRING),
        openapi.Parameter('customer_id', openapi.IN_QUERY, type=openapi.TYPE_INTEGER),
        openapi.Parameter('map_id', openapi.IN_QUERY, type=openapi.TYPE_INTEGER),
        openapi.Parameter('type', openapi.IN_QUERY, type=openapi.TYPE_STRING),
        openapi.Parameter('sort', openapi.IN_QUERY, type=openapi.TYPE_STRING),
        openapi.Parameter('limit', openapi.IN_QUERY, type=openapi.TYPE_INTEGER),
        openapi.Parameter('page', openapi.IN_QUERY, type=openapi.TYPE_INTEGER)])
        
@swagger_auto_schema(method='post', request_body=openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'name': openapi.Schema(type=openapi.TYPE_STRING, description='name'),
        'company_id': openapi.Schema(type=openapi.TYPE_INTEGER, description='company_id'),
        'serial_number': openapi.Schema(type=openapi.TYPE_STRING, description='serial_number'),
        'description': openapi.Schema(type=openapi.TYPE_STRING, description='description'),
        'map_id': openapi.Schema(type=openapi.TYPE_STRING, description=''),
        'route_ids': openapi.Schema(type=openapi.TYPE_ARRAY, description='route ids',
                                    items=openapi.Items(type=openapi.TYPE_INTEGER)),
    }
), tags=[SWAGGER_GROUP_ROBOT])
@api_view(['GET', 'POST'])
@permission_classes([cp.RobotModelPermissions])
def robots(request):
    if request.method == 'GET':
        pagination = get_pagination_params(request)
        map_sort = {
            'is_active': 'user__is_active',
        }
        sort = get_sort_params(request, map_sort)
        rfilter = {
            'company_id_lst': request.GET.getlist('company_id'),
            'dispatch_hub_id': int(request.GET.get('dispatch_hub_id', -1)),
            'map_id': request.GET.get('map_id'),
            'status_lst': request.GET.getlist('status'),
            'customer_id': int(request.GET.get('customer_id', -1)),
            'keyword': request.GET.get('keyword', None),
            'type': request.GET.get('type').split(",") if request.GET.get('type') else None 
        }
        is_supervisor = request.user.groups.filter(name=GROUPS.SUPERVISOR).exists()
        is_staff = request.user.groups.filter(name=GROUPS.STAFF).exists()
        is_customer = request.user.groups.filter(name=GROUPS.CUSTOMER).exists()
        # set filter by role
        if is_supervisor or is_staff:
            rfilter['company_id_lst'] = [request.user.operator.company_id]
            if is_staff and settings.MODULE == CAMELLO_MODULE:
                rfilter['dispatch_hubs_ids'] = [d.id for d in request.user.operator.dispatch_hubs.all()]
        if is_customer:
            rfilter['customer_id'] = request.user.id
        data = RobotService.listing(pagination, sort, rfilter)
        return response_success(data)

    elif request.method == 'POST':
        data = RobotService.create(request.data)
        return response_success(data)


@swagger_auto_schema(
    **swagger_args(
        'get', SWAGGER_GROUP_ROBOT, RobotSerializer),
    manual_parameters=[
        openapi.Parameter('crs', openapi.IN_QUERY, type=openapi.TYPE_INTEGER)])
@swagger_auto_schema(
    **swagger_args(
        'patch', SWAGGER_GROUP_ROBOT, RobotSerializer,
        'name, company_id, dispatch_hub_id, stream_url,serial,description'))
@swagger_auto_schema(
    **swagger_args(
        'delete', SWAGGER_GROUP_ROBOT))
@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def robot(request, robot_pk):
    if request.method == 'GET':
        if RobotService.is_robot(request.user.pk) and request.user.pk != robot_pk:
            raise PermissionDenied('Only robot can get its own data')
        filter_dict = {
            'crs': int(request.GET.get('crs', -1))
        }
        data = RobotService.details(robot_pk, filter_dict)
        return response_success(data)

    elif request.method == 'PATCH':
        data = RobotService.update(request.data, robot_pk)
        return response_success(data)

    elif request.method == 'DELETE':
        RobotService.delete(robot_pk)
        return response_success()


@swagger_auto_schema(
    **swagger_args(
        'get', SWAGGER_GROUP_ROBOT, RobotSerializer))
@api_view(['GET'])
@permission_classes([cp.RobotModelPermissions])
def robot_by_name(request, robot_name):
    if request.method == 'GET':
        data = RobotService.details_by_name(robot_name)
        return response_success(data)


@swagger_auto_schema(method='PATCH', request_body=openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'battery': openapi.Schema(type=openapi.TYPE_INTEGER, description='battery level'),
        'location': openapi.Schema(type=openapi.TYPE_OBJECT, description='location point object'),
        'heading': openapi.Schema(type=openapi.TYPE_NUMBER, description='heading'),
        'mode': openapi.Schema(type=openapi.TYPE_STRING, description='MANUAL, AUTO, IDLE'),
        'robot_state': openapi.Schema(type=openapi.TYPE_OBJECT, description='robot state object'),
    }
), tags=[SWAGGER_GROUP_ROBOT])
@api_view(['PATCH'])
@permission_classes([gp.RobotGroupPermissions])
def robot_heartbeat(request):
    data = RobotService.update_heartbeat(request.data, request.user.id)
    return response_success(data)


@swagger_auto_schema(
    **swagger_args(
        'get', SWAGGER_GROUP_ROBOT, 'JSON File'))
@api_view(['GET'])
@permission_classes([cp.RobotModelPermissions])
def download_robot_config(request, robot_pk):
    data = RobotService.get_config(robot_pk)
    response = HttpResponse(data, "application/json")
    response['Content-Disposition'] = "attachment; filename=config.json"
    return response


@swagger_auto_schema(
    **swagger_args(
        'get', SWAGGER_GROUP_ROBOT, MapSerializer))
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_robot_map(request, robot_pk):
    if request.method == 'GET':
        data = RobotService.get_robot_map(robot_pk)
        return response_success(data)


@swagger_auto_schema(
    **swagger_args(
        'get', SWAGGER_GROUP_ROBOT, RobotHeartBeatSerializer),
    manual_parameters=[
        openapi.Parameter('crs', openapi.IN_QUERY, type=openapi.TYPE_INTEGER)])
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def robot_heartbeat_detail(request, robot_pk):
    if request.method == "GET":
        filter_dict = {
            "crs": int(request.GET.get('crs', -1))
        }
        data = RobotService.get_heartbeat(robot_pk, filter_dict)
        return response_success(data)