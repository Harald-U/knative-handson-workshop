# Knative Traffic Management

In the last section you have replaced revision v1 of the helloworld app with revision v2.

What if you want to do a canary release and test the new revision/version on a subset of your users?  

This is something you can easily do with Istio. It requires additional VirtualService and DestinationRule definitions.

Here is the Knative way, *service-v2-canary.yaml*:
```
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: helloworld
spec:
  template:
    metadata:
      name: helloworld-v2
    spec:
      containers:
        - image: docker.io/ibmcom/kn-helloworld
          env:
            - name: TARGET
              value: "HelloWorld Sample v2 -- UPDATED"
  traffic:
    - tag: v1
      revisionName: helloworld-v1
      percent: 75
    - tag: v2
      revisionName: helloworld-v2
      percent: 25
```
Those additional 7 lines of code will create a 75% / 25% distribution between revisions -v1 / -v2.

1. Open a second session in IBM Cloud Shell (click on the plus sign) and start this command:
   ```
   watch kubectl get pod
   ```

1. In the first IBM Cloud Shell session deploy the change:
   ```
   kubectl apply -f service-v2-canary.yaml
   ```
   
1. Still in the first IBM Cloud Shell session, execute the `curl` within a `watch`:
   ```
   watch curl http://helloworld....appdomain.cloud  
   ```
   
   Check the second IBM Cloud Shell session. There are now two pods, one for each revision:
   ```
   NAME                                        READY   STATUS    RESTARTS   AGE
   helloworld-v1-deployment-655d7dc89-vw6rl    2/2     Running   0          29s
   helloworld-v2-deployment-5456b55564-6zrvc   2/2     Running   0          34s
   ```
   
   In the first Cloud Shell session, you can see output from v1 and v2, but v1 output will be more often than v2 (75 % vs. 25 %).
   

   If you terminate the `watch curl` in session one, you can observe in session two how the two pods will terminate eventually.
   
---

__Continue with the next part [Knative Auto-Scaling](6-Scaling.md)__
