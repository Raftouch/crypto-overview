#### Server Setup

```bash
cd server
```

Install dependencies

```bash
pip install -r requirements.txt
```

add file: .env.development
add your development origin inside it:

```bash
ENVIRONMENT=development
CORS_ORIGIN=http://localhost:5173
```

add file: .env.production
add your production origin inside it:

```bash
ENVIRONMENT=production
CORS_ORIGIN=
```

#### Client Setup

```bash
cd client
```

Install dependencies

```bash
npm install
```

or

```bash
yarn install
```

add file: .env.production
add your production url inside it: VITE_API_URL=
