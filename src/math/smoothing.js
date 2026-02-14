/**
 * Simple Exponential Moving Average (EMA) Filter
 */
export class EMAFilter {
    constructor(alpha = 0.3) {
        this.alpha = alpha;
        this.value = null;
    }

    filter(nextValue) {
        if (this.value === null) {
            this.value = nextValue;
            return this.value;
        }

        this.value = (this.alpha * nextValue) + (1 - this.alpha) * this.value;
        return this.value;
    }

    reset() {
        this.value = null;
    }
}

/**
 * Filters a 3D point (object with x, y, z)
 */
export class Point3DFilter {
    constructor(alpha = 0.3) {
        this.xFilter = new EMAFilter(alpha);
        this.yFilter = new EMAFilter(alpha);
        this.zFilter = new EMAFilter(alpha);
    }

    filter(point) {
        return {
            x: this.xFilter.filter(point.x),
            y: this.yFilter.filter(point.y),
            z: this.zFilter.filter(point.z)
        };
    }

    reset() {
        this.xFilter.reset();
        this.yFilter.reset();
        this.zFilter.reset();
    }
}
