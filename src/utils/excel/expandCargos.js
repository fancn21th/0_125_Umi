/*
 * @Author: your name
 * @Date: 2020-03-04 10:54:42
 * @LastEditTime: 2020-03-04 10:55:21
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \SinotransUIOptimization\0_125_Umi\src\utils\excel\expandCargos.js
 */
export default data => {
  return data.reduce((acc, obj) => {
    const { Cargos } = obj;
    delete obj.Cargos;
    const objs = Cargos.map(item => ({ ...item, ...obj }));
    return [...acc, ...objs];
  }, []);
};
