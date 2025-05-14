'use client';

import { type IAIEduParamsPayload, type IAIEduStatisticLearnersCourse, useGetAIEduStatisticLearners } from '@oe/api';
import { formatDateSlash } from '@oe/core';
import { Button } from '@oe/ui';
import { useCallback, useMemo } from 'react';
import { utils, writeFile } from 'xlsx';

interface IAICourseStatisticExportButtonProps {
  params: IAIEduParamsPayload;
  campaignKey: string;
}

export function AICourseStatisticExportButton({ params, campaignKey }: IAICourseStatisticExportButtonProps) {
  const { fromDate, toDate, courseCuids } = params;

  const { dataAIEduStatisticLearners: data } = useGetAIEduStatisticLearners(campaignKey, {
    from_date: fromDate,
    to_date: toDate,
    course_cuids: courseCuids,
    page: 1,
    per_page: 999999999,
  });

  const uniqueCourseNames = useMemo(() => {
    if (!data?.results || data.results.length === 0) {
      return [];
    }

    const allCourses = data.results.flatMap(student => student.courses || []);

    const uniqueNames = Array.from(new Set(allCourses.map(course => course?.name).filter(Boolean)));

    return uniqueNames;
  }, [data]);

  const getCourseStatus = useCallback((course: IAIEduStatisticLearnersCourse | undefined): string => {
    if (course?.claim_cert_date) {
      return 'Đã nhận';
    }
    if (course?.can_claim_cert) {
      return 'Chưa nhận';
    }
    return 'Chưa đủ điều kiện';
  }, []);

  const getCourseProgress = useCallback((course: IAIEduStatisticLearnersCourse | undefined): string => {
    if (!course?.enroll_date) {
      return '-';
    }
    return `Module ${course.number_of_completed_section}/${course.active_section}`;
  }, []);
  const handleExportExcel = useCallback(() => {
    if (!data || data.length === 0) {
      console.error('No data to export');
      return;
    }

    // Prepare data for export
    const exportData = data?.results?.map((student, index) => {
      // Create base student info
      const studentData: Record<string, string> = {
        STT: (index + 1).toString(),
        'Họ tên': student.full_name ?? '',
        'User ID': student.id ?? '',
        Email: student.email ?? '-', // Email not provided in the data
        'Công việc hiện tại': student.job ?? '',
        'Độ tuổi': student.age_group ?? '',
        'Trường học': student.school ?? '',
        'Tỉnh/Thành phố': student.province ?? '-',
        Nguồn: student.source ?? '-',
      };

      // Add course data for each unique course
      for (const courseName of uniqueCourseNames) {
        const course = student.courses?.find(c => c.name === courseName);

        // Add the course registration date, progress, and status
        studentData[`[${courseName}]\nThời gian đăng ký`] = course?.enroll_date
          ? formatDateSlash(course.enroll_date)
          : '-';

        studentData[`[${courseName}]\nTiến độ học tập`] = getCourseProgress(course);

        studentData[`[${courseName}]\nTrạng thái chứng chỉ`] = getCourseStatus(course);
      }

      return studentData;
    });

    // Create worksheet
    const worksheet = utils.json_to_sheet(exportData);

    // Set column widths
    const columnWidths = [
      { wch: 5 }, // STT
      { wch: 25 }, // Họ tên
      { wch: 20 }, // User ID
      { wch: 25 }, // Email
      { wch: 20 }, // Công việc
      { wch: 10 }, // Độ tuổi
      { wch: 30 }, // Trường học
      { wch: 15 }, // Tỉnh/Thành phố
      { wch: 15 }, // Nguồn
    ];

    // Add column widths for each course (3 columns per course)
    for (const _ of uniqueCourseNames) {
      // Registration date column
      columnWidths.push({ wch: 20 });
      // Progress column
      columnWidths.push({ wch: 15 });
      // Certificate status column
      columnWidths.push({ wch: 20 });
    }

    worksheet['!cols'] = columnWidths;

    // Create workbook
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Danh sách học viên');

    // Generate Excel file
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    writeFile(workbook, `Pho_cap_AI_Program_Report_Danh_sach_hoc_vien_${currentDate}.xlsx`);
  }, [data, uniqueCourseNames, getCourseProgress, getCourseStatus]);

  return (
    <Button variant="default" onClick={handleExportExcel}>
      Export Data
    </Button>
  );
}
