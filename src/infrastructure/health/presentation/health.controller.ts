import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  MemoryHealthIndicator,
  DiskHealthIndicator,
  HealthCheckService,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheck: HealthCheckService,
    private readonly memoryHealth: MemoryHealthIndicator,
    private readonly diskHealth: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    return this.healthCheck.check([
      () => this.memoryHealth.checkHeap('MemoryHeap', 200 * 1024 * 1024),
      () => this.memoryHealth.checkRSS('MemoryRSS', 3000 * 1024 * 1024),
      () =>
        this.diskHealth.checkStorage('DiskStorage', {
          path: '/',
          thresholdPercent: 0.5,
        }),
    ]);
  }
}
