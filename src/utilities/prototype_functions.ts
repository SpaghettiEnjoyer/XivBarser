import "./prototype_functions.d";

Date.prototype.toUtcMs = function toUtcMs(this: Date) {
  return Date.UTC(this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate(),
    this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds(), this.getUTCMilliseconds());
}