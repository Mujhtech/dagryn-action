import * as core from "@actions/core";

export interface ActionInputs {
  version: string;
  targets: string[];
  config: string;
  parallel: number | undefined;
  remoteCache: boolean;
  noCache: boolean;
  verbose: boolean;
  workingDirectory: string;
  dryRun: boolean;
}

export function getInputs(): ActionInputs {
  const parallelStr = core.getInput("parallel");
  let parallel: number | undefined;
  if (parallelStr) {
    parallel = parseInt(parallelStr, 10);
    if (isNaN(parallel) || parallel < 1) {
      throw new Error(`Invalid parallel value: ${parallelStr}`);
    }
  }

  const targetsStr = core.getInput("targets").trim();
  const targets = targetsStr ? targetsStr.split(/\s+/) : [];

  return {
    version: core.getInput("version") || "latest",
    targets,
    config: core.getInput("config") || "dagryn.toml",
    parallel,
    remoteCache: core.getBooleanInput("remote-cache"),
    noCache: core.getBooleanInput("no-cache"),
    verbose: core.getBooleanInput("verbose"),
    workingDirectory: core.getInput("working-directory") || ".",
    dryRun: core.getBooleanInput("dry-run"),
  };
}
