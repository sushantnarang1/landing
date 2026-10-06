# NarangOS

NarangOS is published as a static site on GitHub Pages. An optional local Docker app provides the assessment and contact API when it is running on your computer. The Squarespace domain and DNS records are not changed by this setup.

## Publish the static site

1. In the GitHub repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
2. Push these changes to the `main` branch. The workflow checks lint, types, the Next.js build, and Docker image build, then exports and deploys the static site.
3. Open `https://sushantnarang1.github.io/landing/`.

Pull requests run the checks but do not publish the site. GitHub Pages does not run the API; without the local Docker app, the site remains viewable and backend-dependent buttons stay disabled.

## Run the local app

Install and start Docker Desktop, then from the repository directory run:

```bash
docker compose up --build -d
```

Open [http://localhost:3000](http://localhost:3000) to use the local app. To enable backend actions on the public GitHub Pages site, open that site in the same computer's browser too. Allow the browser's local-network access prompt if shown, then wait for the “Local demo backend is connected” status. Backend actions are sent only to `127.0.0.1` on your computer.

Useful commands:

```bash
docker compose ps
docker compose logs -f
docker compose down
```

The container port is bound to loopback, not your Wi-Fi or public network. The API only accepts browser requests from this GitHub Pages origin and the local app origins. The container runs as a non-root user, drops Linux capabilities, and disables privilege escalation. Do not add secrets to the static site or publish this local API through a tunnel.

## Demo limitations

The contact form is a local demo: submissions are not emailed or stored. Assessment results and the infrastructure pipeline are demonstrations; GitHub pull requests and infrastructure changes are not actually created. The local Docker app must be running for assessment and contact API actions.

## Checks

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npm run build:static
```
