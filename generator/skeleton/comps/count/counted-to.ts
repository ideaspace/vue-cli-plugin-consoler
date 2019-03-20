class CountedTo {

  private static defaultSettings = {
    duration: 2000,
    startValue: 0,
    easingFn: (t: number, b: number, c: number, d: number): number => {
      return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
    },
  };

  private currentValue: number;
  private readonly options: any;
  private readonly countDown: boolean;
  private startTime: number;
  private callback: (arg?: any) => void;

  constructor(settings: object) {
    this.options = Object.assign({}, CountedTo.defaultSettings, settings);
    this.currentValue = 0;
    this.startTime = 0;
    this.countDown = this.options.startValue > this.options.endValue;
    this.callback = () => {};
  }

  public startTo(endValue: number, fn: (arg?: any) => void) {
    this.options.endValue = endValue;
    if (this.options.startValue === this.options.endValue) {
      return this;
    }
    this.counting(this.startTime);
    this.callback = fn;
    return this;
  }

  private counting(currentTime: number) {
    if (!this.startTime) {
      this.startTime = currentTime;
    }
    const progress = currentTime - this.startTime;
    if (this.countDown) {
      this.currentValue = this.options.startValue - this.options.easingFn(progress, 0,
        this.options.startValue - this.options.endValue, this.options.duration);
      this.currentValue = (this.currentValue < this.options.endValue) ? this.options.endValue : this.currentValue;
    } else {
      const {
        startValue,
        endValue,
        duration,
      } = this.options;
      this.currentValue = this.options.easingFn(progress, startValue, endValue - this.options.startValue, duration);
      this.currentValue = (this.currentValue > this.options.endValue) ? this.options.endValue : this.currentValue;
    }

    this.callback(Math.round(this.currentValue));

    if (progress < this.options.duration) {
      requestAnimationFrame((currentTime) => {
        this.counting(currentTime);
      });
    }
  }
}

export default CountedTo;
