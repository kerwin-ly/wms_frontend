import { BixiMockModule } from '@bixi/mock';
// import { environment } from '@environments/environment';
import * as MOCK_DATA from '../../../../_mock';

const MOCK_MODULES = [];

// TODO: only in the development environment
// if (!environment.production) {
MOCK_MODULES.push(
  BixiMockModule.forRoot({
    data: MOCK_DATA
  })
);
// }

export {
  MOCK_MODULES
};
