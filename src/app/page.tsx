import Image from "next/image";
//import styles from "./page.module.css";
import Link from "next/link";
import React from "react";
import { Button } from "@mantine/core";

export default function Home() {
  return (
    <>
        <div>
            <Link href="/weapons"><Button>Weapons page</Button></Link>
            <Link href="/units"><Button>Units page</Button></Link>
        </div>
    </>
  );
}