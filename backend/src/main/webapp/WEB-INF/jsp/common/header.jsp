<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LuxeStay | Luxury Hotel Management System</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <style>
        :root {
            --primary: #4f46e5;
            --primary-hover: #4338ca;
            --secondary: #06b6d4;
            --dark-bg: #0f172a;
            --card-bg: rgba(30, 41, 59, 0.85);
            --border-color: rgba(255, 255, 255, 0.1);
        }

        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: linear-gradient(135deg, #0b0f19 0%, #1e1b4b 50%, #0f172a 100%);
            color: #f8fafc;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .glass-card {
            background: var(--card-bg);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }

        .navbar-custom {
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--border-color);
        }

        .btn-gradient {
            background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
            border: none;
            color: #ffffff;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .btn-gradient:hover {
            opacity: 0.92;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
            color: #ffffff;
        }

        .badge-status-available { background-color: #10b981; color: white; }
        .badge-status-occupied { background-color: #ef4444; color: white; }
        .badge-status-cleaning { background-color: #f59e0b; color: white; }
        .badge-status-maintenance { background-color: #6b7280; color: white; }

        .table-custom {
            color: #e2e8f0;
            background: transparent;
        }
        .table-custom th {
            background: rgba(15, 23, 42, 0.9);
            color: #94a3b8;
            font-weight: 600;
            border-bottom: 1px solid var(--border-color);
        }
        .table-custom td {
            background: transparent;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            vertical-align: middle;
        }

        .form-control-custom, .form-select-custom {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid var(--border-color);
            color: #f8fafc;
            border-radius: 10px;
        }
        .form-control-custom:focus, .form-select-custom:focus {
            background: rgba(15, 23, 42, 0.8);
            border-color: var(--primary);
            box-shadow: 0 0 0 0.25rem rgba(79, 70, 229, 0.25);
            color: #f8fafc;
        }

        .stat-icon-wrapper {
            width: 52px;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 14px;
        }
    </style>
</head>
<body>
