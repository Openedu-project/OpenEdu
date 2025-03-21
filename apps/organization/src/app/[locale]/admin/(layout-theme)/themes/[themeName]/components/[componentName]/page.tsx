'use client';
import { useParams } from 'next/navigation';
import ComingSoon from '../../_components/coming-soon';

export default function MetadataComponents() {
  const { componentName } = useParams();
  console.log(componentName);

  return <ComingSoon />;
}
