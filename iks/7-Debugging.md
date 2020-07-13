# Knative Debugging Tips

There are new places to look for information as to why a Knative service doesn’t work. Here is a collection of helpful commands and examples.

1. Display the Knative service:
   ```
   kn service list
   ```
   Newer versions of Knative may already give an error indication here:
   ```
   NAME         URL                                                                                                                         LATEST          AGE   CONDITIONS   READY   REASON
   helloworld   http://helloworld....appdomain.cloud   helloworld-v3   81m   1 OK / 3     False   RevisionFailed : Revision "helloworld-v4" failed with message: Unable to fetch image "docker.io/ibmcom/kn-helloworld:2": failed to resolve image to digest: failed to fetch image information: GET https://index.docker.io/v2/ibmcom/kn-helloworld/manifests/2: MANIFEST_UNKNOWN: manifest unknown; map[Tag:2].
   ```
   The error is far right, but clear: "Unable to fetch image "docker.io/ibmcom/kn-helloworlds:2". There simply is no image with tag 2.
   
   I have seen other examples, like this:
   ```
   $ kn service list
   NAME          URL                                                   LATEST   AGE    CONDITIONS   READY   REASON
   authors-jee   http://authors-jee-knativetutorial.apps-crc.testing            3m7s   0 OK / 3     False   RevisionMissing : Configuration "authors-jee" does not have any ready Revision.
   ```
   It is normal and to be expected that the revision is not available for some time immediately after the deployment because the application container needs to start first. A revision is ready when the container successfully started. But in this example the revision isn’t available (ready) after over 3 minutes and that is not normal.
   
1. Check the pod(s):
   ```
   kubectl get pod
   ```
   What do you do if you get this as result:
   ```
   No resources found in default namespace.   
   ```
   This is bad: no pod means no logs to look at.
   
1. Check the revision status.

   This is a real example:
   ```
   $ kubectl get revision
   NAME             CONFIG NAME   K8S SERVICE NAME   GENERATION   READY   REASON
   helloworld-v1    helloworld                       1            False   ContainerMissing
   
   $ kubectl get revision helloworld-v1 -o yaml
     [...]
     status:
       conditions:
       - lastTransitionTime: "2020-05-28T06:42:14Z"  
          message: The target could not be activated.
          reason: TimedOut
          severity: Info
          status: "False"
          type: Active
      - lastTransitionTime: "2020-05-28T06:40:04Z"
         status: Unknown
         type: ContainerHealthy
      - lastTransitionTime: "2020-05-28T06:40:05Z"
         message: '0/1 nodes are available: 1 Insufficient cpu.'
         reason: Unschedulable
         status: "False"
         type: Ready
      - lastTransitionTime: "2020-05-28T06:40:05Z"
         message: '0/1 nodes are available: 1 Insufficient cpu.'
         reason: Unschedulable
         status: "False"
         type: ResourcesAvailable
    ```       
    Here you can see in one of the status messages that we were under CPU pressure in the cluster. The pod was "unschedulable". 
    
    There is more information on [Debugging issues with your application](https://knative.dev/docs/serving/debugging-application-issues/) on the Knative docs site.