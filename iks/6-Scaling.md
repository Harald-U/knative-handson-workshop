# Knative Auto-Scaling

Scale to zero is an interesting feature but without additional tricks (like pre-started containers or pods, which aren't available in Knative) it can be annoying because users may have to wait until a new pod is started and ready to receive requests. Or it can lead to problems like time-outs in a microservices architecture if a scaled-to-zero service is called by another service and has to be started first and takes some time to start (e.g. traditional Java based service). 

On the other hand, if our application / microservice is hit hard with many requests, a single pod may not be sufficient to serve them and we may need to scale up. And preferably scale up and down automatically.

Auto-scaling is accomplished by simply adding a few annotation statements to the Knative Service description, *service-v3-scaling.yaml*:
```
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: helloworld
spec:
  template:
    metadata:
      name: helloworld-v3
      annotations:
        # the minimum number of pods to scale down to
        autoscaling.knative.dev/minScale: "1"
        # the maximum number of pods to scale up to
        autoscaling.knative.dev/maxScale: "5"
        # Target in-flight-requests per pod.
        autoscaling.knative.dev/target: "1"
    spec:
      containers:
        - image: docker.io/ibmcom/kn-helloworld
          env:
            - name: TARGET
              value: "HelloWorld Sample v3 -- Scaling"
```
* `minScale: "1"` prevents scale to zero, there will always be at least 1 pod active.
* `maxScale: "5"` will allow to start a maximum of 5 pods.
* `target: "1"` limits every started pod to 1 concurrent request at a time, this is just to make it easier to demo. 

You can also [scale based on CPU usage or number of requests](https://cloud.ibm.com/docs/containers?topic=containers-serverless-apps-knative#scale-cpu-vs-number-requests).

1. Deploy as usual (`kubectl apply ...`) and test if it works (`curl ...`).

1. Download the `hey` load generator tool into your IBM Cloud Shell session and make it executable:
   ```
   wget https://storage.googleapis.com/hey-release/hey_linux_amd64
   mv hey_linux_amd64 hey
   chmod +x hey
   ```
1. In the second IBM Cloud Shell session, watch the pods:
   ```
   watch kubectl get pod
   ```
   You should notice that 1 pod is running, and running longer than 60 seconds. This is the result of `minScale: "1"`. Scale to zero has been turned off.
   
1. In the other IBM Cloud Shell session generate some load:
   ```
   ./hey -z 30s -c 50 http://helloworld-....appdomain.cloud   
   ```
   Switch over to session 2 and watch 4 more pods being started.
   ```
   NAME                                         READY   STATUS    RESTARTS   AGE
   helloworld-v3-deployment-7c6bd88f95-7kd86    2/2     Running   0          48s
   helloworld-v3-deployment-7c6bd88f95-96z75    2/2     Running   0          48s
   helloworld-v3-deployment-7c6bd88f95-dkjdr    2/2     Running   0          48s
   helloworld-v3-deployment-7c6bd88f95-m75x4    2/2     Running   0          9m50s
   helloworld-v3-deployment-7c6bd88f95-zftw5    2/2     Running   0          48s
   ```
5. Check the output of the `hey`command, for example the histogram:
   ```
    Response time histogram:
    0.009 [1]     |
    0.035 [47400] |■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    0.061 [9506]  |■■■■■■■■
    0.087 [557]   |
    0.113 [117]   |
    0.139 [41]    |
    0.165 [10]    |
    0.191 [7]     |
    0.217 [5]     |
    0.244 [7]     |
    0.270 [33]    |
   ```
   None of the requests took much longer than a quarter of a second. Thats because one pod is always started and can take the initial brunt of the requests.
  
**This concludes the main part of the Knative workshop.**   

The IBM Cloud documentation of Knative has a collection of [useful Knative Serving settings](https://cloud.ibm.com/docs/containers?topic=containers-serverless-apps-knative#knative-service-settings), including:

* Scaling based on CPU or number of requests
* Changing default container port
* Creating private (cluster internal) only services
etc.
  
---

__Continue with the last part [Knative Debugging Tips](7-Debugging.md)__