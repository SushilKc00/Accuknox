function Loading({ size }: any) {
  return (
    <div>
      <div
        className="rounded-full animate-spin border-b-2 border-b-[#202f6b]"
        style={{
          width: size,
          height: size,
        }}
      ></div>
    </div>
  );
}

export default Loading;
