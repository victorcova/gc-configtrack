import { execFileSync } from "node:child_process";
import { access, readFile } from "node:fs/promises";

const REQUIRED_FILES = [
    "dist/index.html",
    "dist/README.md",
    "dist/VERSION",
    "dist/assets/css/style.css",
    "dist/assets/js/app.js",
    "dist/build-info.json"
];

for (const file of REQUIRED_FILES) {
    await access(file);
    console.log(`OK: ${file}`);
}

const sourceVersion = (
    await readFile("VERSION", "utf8")
).trim();

const artifactVersion = (
    await readFile("dist/VERSION", "utf8")
).trim();

if (sourceVersion !== artifactVersion) {
    throw new Error(
        "A versão do artefato é diferente da versão do projeto."
    );
}

const buildInformation = JSON.parse(
    await readFile("dist/build-info.json", "utf8")
);

const expectedCommit = process.env.GITHUB_SHA
    ? process.env.GITHUB_SHA.slice(0, 7)
    : execFileSync(
        "git",
        ["rev-parse", "--short", "HEAD"],
        { encoding: "utf8" }
    ).trim();

const metadataAreValid =
    buildInformation.project === "ConfigTrack" &&
    buildInformation.version === sourceVersion &&
    buildInformation.commit === expectedCommit &&
    buildInformation.node === process.version &&
    typeof buildInformation.generatedAt === "string" &&
    Number.isNaN(
        Date.parse(buildInformation.generatedAt)
    ) === false;

if (metadataAreValid === false) {
    console.error(buildInformation);
    throw new Error(
        "Os metadados do artefato são inválidos."
    );
}

console.log("Metadados validados com sucesso.");
console.log("Conteúdo de build-info.json:");
console.log(JSON.stringify(buildInformation, null, 2));
