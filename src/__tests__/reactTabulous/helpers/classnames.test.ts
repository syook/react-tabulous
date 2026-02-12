import classnames from '../../../reactTabulous/helpers/classnames';

describe('classnames', () => {
  test('should return classnames 1', () => {
    const className = classnames('class1', 'class2');
    expect(className).toEqual('class1 class2');
  });

  test('should return classnames 2', () => {
    const className = classnames('class1', {
      class2: true,
      class3: false
    });
    expect(className).toEqual('class1 class2');
  });

  test('should return classnames 3', () => {
    const className = classnames({
      class1: true,
      class2: false
    });
    expect(className).toEqual('class1');
  });

  test('should return classnames 4', () => {
    const className = classnames({
      class1: false,
      class2: false
    });
    expect(className).toEqual('');
  });

  test('should return classnames 5', () => {
    const classNameFromProps = '';
    const className = classnames(
      'class1',
      'class2',
      'class3',
      {
        class4: true,
        class5: false
      },
      classNameFromProps
    );
    expect(className).toEqual('class1 class2 class3 class4 ');
  });
});
