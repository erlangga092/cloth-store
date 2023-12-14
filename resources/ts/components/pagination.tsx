import { PaginationLinkType } from "@/types/pagination";
import { Link } from "@inertiajs/react";
import React from "react";

export function Pagination({
  links,
  align,
}: {
  links: Array<PaginationLinkType>;
  align: string;
}) {
  return (
    <>
      <nav>
        <ul className={`pagination justify-content-${align} mb-0`}>
          {links.map((link, index) => (
            <li
              className={`page-item ${link.url == null} ? 'disabled': '' ${
                link.active ? "active" : ""
              }`}
              key={index}
            >
              <Link
                className="page-link"
                href={link.url === null ? "#" : link.url}
                dangerouslySetInnerHTML={{ __html: link.label }}
              ></Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
