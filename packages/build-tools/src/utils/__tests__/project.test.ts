import { ExpoConfig } from '@expo/config';
import { Android } from '@expo/eas-build-job';
import spawn from '@expo/turtle-spawn';
import { instance, mock, when } from 'ts-mockito';

import { BuildContext } from '../../context';
import { PackageManager } from '../packageManager';
import { runExpoCliCommand } from '../project';

jest.mock('@expo/turtle-spawn', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe(runExpoCliCommand, () => {
  describe('Expo SDK >= 46', () => {
    it('spawns expo via "npx" when package manager is npm', () => {
      const mockExpoConfig = mock<ExpoConfig>();
      when(mockExpoConfig.sdkVersion).thenReturn('46.0.0');
      const expoConfig = instance(mockExpoConfig);

      const mockCtx = mock<BuildContext<Android.Job>>();
      when(mockCtx.packageManager).thenReturn(PackageManager.NPM);
      when(mockCtx.appConfig).thenReturn(expoConfig);
      when(mockCtx.runGlobalExpoCliCommand).thenReturn(jest.fn());
      const ctx = instance(mockCtx);

      void runExpoCliCommand(ctx, ['doctor'], {}, { npmVersionAtLeast7: true });
      expect(ctx.runGlobalExpoCliCommand).not.toHaveBeenCalled();
      expect(spawn).toHaveBeenCalledWith('npx', ['expo', 'doctor'], expect.any(Object));
    });

    it('spawns expo via "yarn" when package manager is yarn', () => {
      const mockExpoConfig = mock<ExpoConfig>();
      when(mockExpoConfig.sdkVersion).thenReturn('46.0.0');
      const expoConfig = instance(mockExpoConfig);

      const mockCtx = mock<BuildContext<Android.Job>>();
      when(mockCtx.packageManager).thenReturn(PackageManager.NPM);
      when(mockCtx.appConfig).thenReturn(expoConfig);
      when(mockCtx.runGlobalExpoCliCommand).thenReturn(jest.fn());
      const ctx = instance(mockCtx);

      void runExpoCliCommand(ctx, ['doctor'], {}, { npmVersionAtLeast7: true });
      expect(ctx.runGlobalExpoCliCommand).not.toHaveBeenCalled();
      expect(spawn).toHaveBeenCalledWith('npx', ['expo', 'doctor'], expect.any(Object));
    });

    it('spawns expo via "pnpm" when package manager is pnpm', () => {
      const mockExpoConfig = mock<ExpoConfig>();
      when(mockExpoConfig.sdkVersion).thenReturn('46.0.0');
      const expoConfig = instance(mockExpoConfig);

      const mockCtx = mock<BuildContext<Android.Job>>();
      when(mockCtx.packageManager).thenReturn(PackageManager.PNPM);
      when(mockCtx.appConfig).thenReturn(expoConfig);
      when(mockCtx.runGlobalExpoCliCommand).thenReturn(jest.fn());
      const ctx = instance(mockCtx);

      void runExpoCliCommand(ctx, ['doctor'], {}, { npmVersionAtLeast7: true });
      expect(ctx.runGlobalExpoCliCommand).not.toHaveBeenCalled();
      expect(spawn).toHaveBeenCalledWith('pnpm', ['expo', 'doctor'], expect.any(Object));
    });

    it('spawns expo via "bun" when package manager is bun', () => {
      const mockExpoConfig = mock<ExpoConfig>();
      when(mockExpoConfig.sdkVersion).thenReturn('46.0.0');
      const expoConfig = instance(mockExpoConfig);

      const mockCtx = mock<BuildContext<Android.Job>>();
      when(mockCtx.packageManager).thenReturn(PackageManager.BUN);
      when(mockCtx.appConfig).thenReturn(expoConfig);
      when(mockCtx.runGlobalExpoCliCommand).thenReturn(jest.fn());
      const ctx = instance(mockCtx);

      void runExpoCliCommand(ctx, ['doctor'], {}, { npmVersionAtLeast7: true });
      expect(ctx.runGlobalExpoCliCommand).not.toHaveBeenCalled();
      expect(spawn).toHaveBeenCalledWith('bun', ['expo', 'doctor'], expect.any(Object));
    });

    it('calls ctx.runGlobalExpoCliCommand if forceUseGlobalExpoCli = true', () => {
      const mockExpoConfig = mock<ExpoConfig>();
      when(mockExpoConfig.sdkVersion).thenReturn('46.0.0');
      const expoConfig = instance(mockExpoConfig);

      const mockCtx = mock<BuildContext<Android.Job>>();
      when(mockCtx.packageManager).thenReturn(PackageManager.PNPM);
      when(mockCtx.appConfig).thenReturn(expoConfig);
      when(mockCtx.runGlobalExpoCliCommand).thenReturn(jest.fn());
      const ctx = instance(mockCtx);

      void runExpoCliCommand(
        ctx,
        ['doctor'],
        {},
        { npmVersionAtLeast7: true, forceUseGlobalExpoCli: true }
      );
      expect(ctx.runGlobalExpoCliCommand).toHaveBeenCalledWith(
        ['doctor'],
        expect.any(Object),
        true
      );
      expect(spawn).not.toHaveBeenCalled();
    });
  });

  describe('EXPO_USE_LOCAL_CLI = 0', () => {
    it('calls ctx.runGlobalExpoCliCommand', () => {
      const mockExpoConfig = mock<ExpoConfig>();
      when(mockExpoConfig.sdkVersion).thenReturn('46.0.0');
      const expoConfig = instance(mockExpoConfig);

      const mockCtx = mock<BuildContext<Android.Job>>();
      when(mockCtx.env).thenReturn({ EXPO_USE_LOCAL_CLI: '0' });
      when(mockCtx.packageManager).thenReturn(PackageManager.PNPM);
      when(mockCtx.appConfig).thenReturn(expoConfig);
      when(mockCtx.runGlobalExpoCliCommand).thenReturn(jest.fn());
      const ctx = instance(mockCtx);

      void runExpoCliCommand(ctx, ['doctor'], {}, { npmVersionAtLeast7: true });
      expect(ctx.runGlobalExpoCliCommand).toHaveBeenCalledWith(
        ['doctor'],
        expect.any(Object),
        true
      );
      expect(spawn).not.toHaveBeenCalled();
    });
  });

  describe('Expo SDK < 46', () => {
    it('calls ctx.runGlobalExpoCliCommand', () => {
      const mockExpoConfig = mock<ExpoConfig>();
      when(mockExpoConfig.sdkVersion).thenReturn('45.0.0');
      const expoConfig = instance(mockExpoConfig);

      const mockCtx = mock<BuildContext<Android.Job>>();
      when(mockCtx.packageManager).thenReturn(PackageManager.PNPM);
      when(mockCtx.appConfig).thenReturn(expoConfig);
      when(mockCtx.runGlobalExpoCliCommand).thenReturn(jest.fn());
      const ctx = instance(mockCtx);

      void runExpoCliCommand(ctx, ['doctor'], {}, { npmVersionAtLeast7: true });
      expect(ctx.runGlobalExpoCliCommand).toHaveBeenCalledWith(
        ['doctor'],
        expect.any(Object),
        true
      );
      expect(spawn).not.toHaveBeenCalled();
    });
  });
});
