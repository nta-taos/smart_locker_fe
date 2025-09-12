import { useEffect, useState } from 'react';

import { TagItemType } from '@/types/tag.type';

export const useTagList = () => {
  const [tags, setTags] = useState<TagItemType>();
  const [isShow, setIsShow] = useState(true);
  const handleShow = () => {
    setIsShow((prev) => !prev);
  };

  useEffect(() => {
    setTags({
      my: 22,
      recent: 91,
      week: 19,
      wallet: 10000000,
    });
  }, []);

  return { tags, isShow, handleShow };
};
