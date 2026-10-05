# NarangOS

NarangOS is a Next.js application for infrastructure assessments and platform engineering workflows.

## Local development

Use Node.js 22 and npm:

```bash
npm ci
npm run dev
```

The app is available at [http://localhost:3000](http://localhost:3000).

## Validation

Run the same checks as GitHub Actions before pushing:

```bash
npm run lint
npm run typecheck
npm run build
```

GitHub Actions runs these checks on pushes and pull requests targeting `main`. There is no automated test suite or deployment step configured yet.

## Container and AKS

The Dockerfile is prepared for a production container using Next.js standalone output. To build and run it locally when Docker is available:

```bash
docker build -t narangos:local .
docker run --rm -p 3000:3000 narangos:local
```

Container publishing and AKS deployment are intentionally not configured. The Kubernetes manifest is a draft and needs an image registry, namespace, secrets, and deployment health checks before it is ready to use.
