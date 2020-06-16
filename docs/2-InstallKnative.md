# Installing Knative

The Kubernetes cluster you have been assigned and you will use during this workshop is provided by the [IBM Cloud Kubernetes Service](https://cloud.ibm.com/docs/containers?topic=containers-getting-started), IKS. 

IKS offers add-ons to Kubernetes, namely Istio and Knative. They will be automatically installed and managed by IBM. There is a cluster size requirement for Istio (minimum 3 worker nodes) which is also applicable to Knative because it requires Istio.

1. To install Knative, go to the 'Add-ons' page of your cluster:
   ![IKS add-ons](images/add-ons.png)
   
1. Click on 'Install', this will inform you about the version of Istio and Knative:
   ![IKS add-ons](images/knative-add-on.png)
   
1. Click 'Install' again, after a moment, the 'Install' buttons for Istio and Knative will disappear and a status for the installation will show:
   ![IKS add-ons](images/add-ons-2.png)
      
1. The installation status will show a green check mark and "Normal - Addon Ready"
when Knative and Istio have been installed successfully.

1. In the IBM Cloud Shell check the Kubernetes namespaces:

   ```
   kubectl get ns
   ```
   Output:
   ```
   NAME               STATUS   AGE
   default            Active   18h
   ibm-cert-store     Active   18h
   ibm-operators      Active   18h
   ibm-system         Active   18h
   istio-system       Active   12m
   knative-eventing   Active   12m
   knative-serving    Active   12m
   knative-sources    Active   12m
   kube-node-lease    Active   18h
   kube-public        Active   18h
   kube-system        Active   18h
   tekton-pipelines   Active   12m
   ```
   
   Notice 'istio-system' and the namespaces starting with 'knative-'
   
   If you like check the pods in each of these namespaces.
   
---

__Continue with the next part [Deploy a Knative Service](3-DeployKnativeService.md)__      

