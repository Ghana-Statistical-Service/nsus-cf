"use client";
import { useEffect, useState } from "react";

export type Option = { id: number; name: string };

export function useCascade(
  enabled: boolean,
  url: string
) {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    if (!enabled) return;

    setOptions([]);
    setSelectedId("");

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setOptions(
          data.map((item: any) => ({
            id:
              item.group_id ??
              item.commodity_id ??
              item.lunit_id ??
              item.lunit_size_id,
            name:
              item.group_desc ??
              item.commodity_desc ??
              item.lunit_desc ??
              item.lunit_size_desc,
          }))
        );
      });
  }, [enabled, url]);

  return { options, selectedId, setSelectedId, reset: () => {
    setOptions([]);
    setSelectedId("");
  }};
}