import { JestBuilder } from '@cashbound-id/jest/utils';

import { mitt } from '@/emitter';
import { noop } from '@/misc';

interface SampleEventEmitterType {
  '@shared/test-emitter': string;
}

const mockEmitterSpy = jest.fn();
const mockAllEventEmitterSpy = jest.fn();

describe('Testing Emitter Utils', () => {
  it('Testing register and unregister event should be working properly', () => {
    const emitter = mitt<SampleEventEmitterType>();

    /**
     * Register Event Emitter Handler
     */
    emitter.on('@shared/test-emitter', noop);
    emitter.on('@shared/test-emitter', mockEmitterSpy);
    emitter.on('*', mockAllEventEmitterSpy);

    /**
     * Simulate emit event
     */
    expect(mockEmitterSpy).not.toHaveBeenCalled();
    expect(mockAllEventEmitterSpy).not.toHaveBeenCalled();
    emitter.emit('@shared/test-emitter', 'sample test');

    JestBuilder.test(mockEmitterSpy)
      .toHaveBeenCalledTimes(1)
      .toHaveBeenNthCalledWith(1, 'sample test');
    JestBuilder.test(mockAllEventEmitterSpy)
      .toHaveBeenCalledTimes(1)
      .toHaveBeenNthCalledWith(1, '@shared/test-emitter', 'sample test');

    jest.clearAllMocks();

    /**
     * Un-Register Event Emitter Handler
     */
    emitter.off('@shared/test-emitter');
    emitter.off('*', mockAllEventEmitterSpy);

    /**
     * Simulate emit event
     */
    expect(mockEmitterSpy).not.toHaveBeenCalled();
    expect(mockAllEventEmitterSpy).not.toHaveBeenCalled();
    emitter.emit('@shared/test-emitter', 'sample test');

    expect(mockEmitterSpy).not.toHaveBeenCalled();
    expect(mockAllEventEmitterSpy).not.toHaveBeenCalled();

    /**
     * Un-Register unknown event should be still working properly
     */
    emitter.off('@shared/test' as keyof SampleEventEmitterType);
  });
});
