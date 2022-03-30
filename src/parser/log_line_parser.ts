export interface ILogLineParser {
  execute(logLine: Array<string>): void;
}