import Link from "next/link";
import Image from "next/image";
import {
  Button,
  buttonVariants,
  Empty,
  EmptyDescription,
  EmptyImage,
  EmptyTitle,
} from "keep-react";

export const EmptyComponent = ({ children }) => {
  return (
    <Empty>
      <EmptyImage>
        <Image
          src="https://staticmania.cdn.prismic.io/staticmania/499b23f3-41ed-4bc9-a9eb-43d13779d2f8_Property+1%3DSad+screen_+Property+2%3DSm.svg"
          height={234}
          width={350}
          alt="404"
        />
      </EmptyImage>
      <EmptyTitle className="mb-[14px] mt-5">
        Oops! You seem to be lost
      </EmptyTitle>
      <EmptyDescription className="mb-8">{children}</EmptyDescription>
      {/* <Link href="/" className={buttonVariants({ color: "primary" })}>
        Go to home
      </Link> */}
    </Empty>
  );
};
