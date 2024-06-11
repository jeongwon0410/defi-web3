"use client";

import Link, { LinkProps } from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode, Suspense } from "react";

type Props = LinkProps & {
  className: string;
  href: string;
  children: ReactNode;
};

export default function RetainQueryLink(props: Props) {
  return (
    <Suspense>
      <_RetainQueryLink {...props} />
    </Suspense>
  );
}

const _RetainQueryLink = ({ href, ...props }: Props) => {
  const params = useSearchParams();

  const referral = params.get("referral");
  const _href = referral ? `${href}?referral=${referral}` : href;

  return <Link {...props} href={_href} />;
};
