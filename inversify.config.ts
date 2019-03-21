import {Container} from 'inversify';
import {TYPES} from './types';
import {Department} from './src/departments/department';
import {PostOffice} from './src/post-office';
import {ReceiptDepartment} from './src/departments/receipt.department';

const inversifyContainer = new Container();

// should bind interface (abstraction) to the implementation (concretion)
// read more: https://www.npmjs.com/package/inversify/

//inversifyContainer.bind<Department>(TYPES.Department).to(ReceiptDepartment);
inversifyContainer.bind<ReceiptDepartment>(ReceiptDepartment).toSelf();
inversifyContainer.bind<PostOffice>(PostOffice).toSelf();

export {inversifyContainer};
