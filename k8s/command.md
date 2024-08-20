Get Pod:
```bash
  kubectl get pods
```
Delete Pod:
```bash
  kubectl delete pod <pod-name>
```
Describe Pod:
```bash
  kubectl describe pod <pod-name>
```

Scale ReplicaSet:
```bash
  kubectl scale replicaset <replicaset-name> --replicas=<number-of-replicas>
```
Get ReplicaSet:
```bash
  kubectl get replicaset
```
Delete ReplicaSet:
```bash
  kubectl delete replicaset <replicaset-name>
```
Get Deployments:
```bash
  kubectl get deployments
```
Create Deployment:
```bash
  kubectl apply -f k8s/deployments/deployment.yaml
```
Get Deployments:
```bash
  kubectl get deployments
```
Update Deployment:
```bash
  kubectl set image deployment/myapp-deployment nginx=nginx:1.19.4
```
Scale Deployment:
```bash
  kubectl scale deployment myapp-deployment --replicas=5
```
Rollback Deployment:
```bash
kubectl describe deployment myapp-deployment
```
Describe Deployment:
```bash
  kubectl describe deployment myapp-deployment
```

Delete Deployment:
```bash
  kubectl delete deployment myapp-deployment
```
Rollback Deployment:
```bash
  kubectl rollout undo deployment/myapp-deployment
```
Scale Deployment:
```bash
  kubectl scale deployment myapp-deployment --replicas=5
```
Update deployment:
```bash
  kubectl set image deployment/myapp-deployment nginx=nginx:1.19.4
```

Check status of deployment:
```bash
  kubectl rollout status deployment/myapp-deployment
```

Update the image of the deployment:
```bash
  kubectl set image deployment/myapp-deployment nginx=nginx:1.19.4
```
Edit Deployment:
```bash
  kubectl edit deployment/myapp-deployment
```