import React from 'react';

export const useEmphasizer = ({
  emphasize,
  inputValue,
  children,
  itemValue,
}: any) => {
  const emphasizee =
    typeof children === 'string' ? children.toString() : itemValue;
  const emphasizedChildString = emphasizee.replace(
    new RegExp(inputValue, 'gi'),
    (match: any) => `<span class="emphasizedItem">${match}</span>`
  );
  const emphasizedChild = (
    <span dangerouslySetInnerHTML={{ __html: emphasizedChildString }} />
  );

  const itemChild = !emphasize ? children : emphasizedChild;

  const emphasizeStyles =
    typeof emphasize === 'object'
      ? emphasize
      : {
          fontWeight: 'extrabold',
        };

  return { itemChild, emphasizeStyles };
};
