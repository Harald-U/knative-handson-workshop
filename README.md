# Knative Hands-on Workshop

![Knative Logo](docs/images/knative-logo.png)

## What is Knative? 

The [Knative web site](https://knative.dev) describes it as “components build on top of Kubernetes, abstracting away the complex details and enabling developers to focus on what matters.” 

It has two distinct components, originally it were three. The third was called Knative Build, it is now a project of its own: “Tekton“. The remaining parts are:
* __Knative Serving,__ responsible for deploying and running containers, also networking and auto-scaling. Auto-scaling allows scale to zero and is the main reason why Knative is referred to as Serverless platform.
* __Knative Eventing,__ connecting Knative services (deployed by Knative Serving) with events or streams of events.

This workshop will focus on Knative Serving and will cover the following topics:

1. [Prerequisites](docs/1-Prereqs.md) (access to a Kubernetes cluster, work environment, etc.)
1. [Installing Knative Serving](docs/2-InstallKnative.md)
1. [Deploying an example app as Knative Service](docs/3-DeployKnativeService.md)
1. [Creating a Knative Revision](docs/4-Revision.md)
1. [Traffic Management](docs/5-TrafficManagement.md)
1. [Scaling](docs/6-Scaling.md)
1. [Debugging](docs/7-Debugging.md)

## Resources:

You can find detailed information and learn more about Knative here:

1. [Knative documentation](https://knative.dev/docs)
2. [Red Hat Knative Tutorial](https://redhat-developer-demos.github.io/knative-tutorial/knative-tutorial/index.html)

