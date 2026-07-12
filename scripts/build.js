import { execFileSync } from "node:child_process";
import {
    cp,
    mkdir,
    readFile,
    rm,
    writeFile
} from "node:fs/promises";
import path from "node:path";

const ROOT_DIRECTORY = process.cwd();
const DIST_DIRECTORY = path.join(ROOT_DIRECTORY, "dist");

function getCurrentCommit() {
    if (process.env.GITHUB_SHA) {
        return process.env.GITHUB_SHA.slice(0, 7);
    }

    return execFileSync(
        "git",
        ["rev-parse", "--short", "HEAD"],
        { encoding: "utf8" }
    ).trim();
}

async function copyProjectFile(relativePath) {
    const source = path.join(ROOT_DIRECTORY, relativePath);
    const destination = path.join(DIST_DIRECTORY, relativePath);

    await mkdir(path.dirname(destination), {
        recursive: true
    });

    await cp(source, destination, {
        recursive: true
    });
}

async function buildProject() {
    const version = (
        await readFile(
            path.join(ROOT_DIRECTORY, "VERSION"),
            "utf8"
        )
    ).trim();

    await rm(DIST_DIRECTORY, {
        recursive: true,
        force: true
    });

    await mkdir(DIST_DIRECTORY, {
        recursive: true
    });

    const projectFiles = [
        "index.html",
        "README.md",
        "VERSION",
        "assets"
    ];

    for (const projectFile of projectFiles) {
        await copyProjectFile(projectFile);
    }

    const buildInformation = {
        project: "ConfigTrack",
        version,
        commit: getCurrentCommit(),
        generatedAt: new Date().toISOString(),
        node: process.version
    };

    await writeFile(
        path.join(DIST_DIRECTORY, "build-info.json"),
        `${JSON.stringify(buildInformation, null, 2)}\n`,
        "utf8"
    );

    console.log("Build concluído com sucesso.");
    console.log(`Projeto: ${buildInformation.project}`);
    console.log(`Versão: ${buildInformation.version}`);
    console.log(`Commit: ${buildInformation.commit}`);
    console.log(`Destino: ${DIST_DIRECTORY}`);
}

buildProject().catch((error) => {
    console.error("Falha durante a construção do projeto.");
    console.error(error);
    process.exitCode = 1;
});
