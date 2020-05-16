FROM hayd/alpine-deno:1.0.0

EXPOSE 8080  
WORKDIR /app

# Prefer not to run as root.
USER deno

COPY deps.ts .
RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .
RUN deno cache main.ts
# Compile the main app so that it doesn't need to be compiled each startup/entry.

ARG HOST='127.0.0.1'

ENV HOST=${HOST}

ARG PORT=8080

ENV PORT=${PORT}

CMD ["run", "--allow-net", "--allow-env", "main.ts"]

