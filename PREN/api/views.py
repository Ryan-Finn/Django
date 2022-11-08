from django.http import JsonResponse

# Create your views here.
from .models import Event


def Event_Get(request, startDate, endDate):
    edtStart = startDate.replace("T", " ")
    edtStart = edtStart[:-1] + ""
    edtStart = edtStart[:-1] + ""
    edtStart = edtStart[:-1] + ""
    print(edtStart)
    edtEnd = endDate.replace("T", " ")
    edtEnd = edtEnd[:-1] + ""
    edtEnd = edtEnd[:-1] + ""
    edtEnd = edtEnd[:-1] + ""
    print(edtEnd)
    data = list(Event.objects.filter(start__gte=edtStart, end__lte=edtEnd).values())
    print(data)
    return JsonResponse(data, safe=False)


def Event_Update(request, id, newTitle):
    data = Event.objects.get(event_id=id).update(title=newTitle)
    print(data)


def Event_Delete(request, id):
    data = Event.objects.get(event_id=id).delete()
    print(data)


def Event_Create(request, newTitle, start, end):
    i = Event.objects.count()
    idVal = "e" + i
    edtStart = start.replace("T", " ")
    edtStart = edtStart[:-1] + ""
    edtStart = edtStart[:-1] + ""
    edtStart = edtStart[:-1] + ""
    edtEnd = end.replace("T", " ")
    edtEnd = edtEnd[:-1] + ""
    edtEnd = edtEnd[:-1] + ""
    edtEnd = edtEnd[:-1] + ""

    newEvent = Event(event_id=idVal, title=newTitle, startDate=edtStart, endDate=edtEnd)
    newEvent.save()
