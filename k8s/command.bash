Get Pod:
  kubectl get pods
Delete Pod:
  kubectl delete pod <pod-name>
Scale ReplicaSet:
  kubectl scale replicaset <replicaset-name> --replicas=<number-of-replicas>
Get ReplicaSet:
  kubectl get replicaset
Describe Pod:
  kubectl describe pod <pod-name>
Get Services:
  kubectl get services
Get Nodes:
  kubectl get nodes
Get Deployments:
  kubectl get deployments
Delete ReplicaSet:
  kubectl delete replicaset <replicaset-name>

Create Deployment:
  kubectl apply -f k8s/deployments/deployment.yaml
Get Deployments:
  kubectl get deployments
Update Deployment:
  kubectl set image deployment/myapp-deployment nginx=nginx:1.19.4
Scale Deployment:
  kubectl scale deployment myapp-deployment --replicas=5
Rollback Deployment:
  kubectl rollout undo deployment/myapp-deployment
Describe Deployment:
  kubectl describe deployment myapp-deployment
Delete Deployment:
  kubectl delete deployment myapp-deployment