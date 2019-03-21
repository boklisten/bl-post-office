import {Container} from 'inversify';
import {inversifyContainer} from '../inversify.config';

export class TestEnvironment {
  private _container: Container;

  public constructor(config?: {
    classesToBind?: any[];
    classesToMock?: {real: any; mock: any}[];
  }) {
    this._container = inversifyContainer.createChild();
    if (config) {
      if (config.classesToBind) {
        this.bind(config.classesToBind);
      }

      if (config.classesToMock) {
        this.mockClass(config.classesToMock);
      }
    }
  }

  public bind(classes: any[]) {
    classes.forEach(c => this._container.bind(c).toSelf());
  }

  public mockClass(mocks: {real: any; mock?: any; mockedClass?: any}[]) {
    mocks.forEach(m => {
      if (m.mock) {
        this._container.bind(m.real).toConstantValue(m.mock);
      } else if (m.mockedClass) {
        this._container.bind(m.real).to(m.mockedClass);
      }
    });
  }

  public get<T>(className: any) {
    return this._container.get<T>(className);
  }

  public clear() {
    this._container = inversifyContainer.createChild();
  }
}
