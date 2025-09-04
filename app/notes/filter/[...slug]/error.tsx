"use client";

type Props = {
  error: Error;
};

export default function Error({ error }: Props) {
  return (
    <p className="error">Could not fetch the list of notes. {error.message}</p>
  );
}
