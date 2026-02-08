import * as core from "@actions/core";
import type { ActionInputs } from "./inputs";
import type { RunResult } from "./runner";

export async function writeSummary(
  inputs: ActionInputs,
  result: RunResult
): Promise<void> {
  const status = result.exitCode === 0 ? "Success" : "Failure";
  const statusIcon = result.exitCode === 0 ? "\u2705" : "\u274c";

  await core.summary
    .addHeading("Dagryn Workflow Run")
    .addTable([
      [
        { data: "Status", header: true },
        { data: "Duration", header: true },
        { data: "Config", header: true },
      ],
      [
        `${statusIcon} ${status}`,
        `${result.duration}s`,
        inputs.config,
      ],
    ])
    .addHeading("Configuration", 3)
    .addTable([
      [
        { data: "Setting", header: true },
        { data: "Value", header: true },
      ],
      ["Targets", inputs.targets.length > 0 ? inputs.targets.join(", ") : "(default)"],
      ["Parallel", inputs.parallel?.toString() ?? "auto"],
      ["Cache", inputs.noCache ? "disabled" : "enabled"],
      ["Remote Cache", inputs.remoteCache ? "enabled" : "disabled"],
      ["Dry Run", inputs.dryRun ? "yes" : "no"],
      ["Verbose", inputs.verbose ? "yes" : "no"],
    ])
    .write();
}
