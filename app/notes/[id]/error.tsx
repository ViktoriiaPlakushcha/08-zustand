"use client";

type Props = {
  error: Error;
};

export default function Error({ error }: Props) {
  return <p className="error">Could not fetch note details. {error.message}</p>;
}
