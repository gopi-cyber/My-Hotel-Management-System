<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>

<jsp:include page="common/header.jsp" />
<jsp:include page="common/navbar.jsp" />

<!-- Hero Section -->
<section class="py-5 text-center position-relative overflow-hidden">
    <div class="container py-lg-5">
        <div class="row justify-content-center">
            <div class="col-lg-9">
                <span class="badge bg-primary bg-opacity-25 text-primary border border-primary px-3 py-2 rounded-pill mb-3 fw-semibold">
                    <i class="fa-solid fa-sparkles me-1"></i> Welcome to World-Class Hospitality
                </span>
                <h1 class="display-4 fw-extrabold text-white mb-4">
                    Experience Unrivaled Comfort & Elegance at <span class="text-primary">LuxeStay</span>
                </h1>
                <p class="lead text-secondary mb-4 fs-5">
                    Seamless hotel management for guests, receptionists, and administrators powered by modern Java, Hibernate ORM, and MySQL.
                </p>
                <div class="d-flex flex-wrap justify-content-center gap-3">
                    <a href="${pageContext.request.contextPath}/guest/rooms" class="btn btn-gradient btn-lg px-4 py-2 rounded-pill">
                        <i class="fa-solid fa-calendar-days me-2"></i> Book a Room Now
                    </a>
                    <a href="${pageContext.request.contextPath}/login" class="btn btn-outline-light btn-lg px-4 py-2 rounded-pill">
                        <i class="fa-solid fa-right-to-bracket me-2"></i> Sign In to Portal
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Featured Rooms Section -->
<section class="py-5">
    <div class="container">
        <div class="d-flex justify-content-between align-items-end mb-4">
            <div>
                <h2 class="fw-bold text-white mb-1"><i class="fa-solid fa-bed me-2 text-info"></i> Featured Suites & Rooms</h2>
                <p class="text-secondary mb-0">Handpicked luxury spaces for your perfect stay</p>
            </div>
            <a href="${pageContext.request.contextPath}/guest/rooms" class="btn btn-outline-info btn-sm rounded-pill px-3">
                View All Rooms <i class="fa-solid fa-arrow-right ms-1"></i>
            </a>
        </div>

        <div class="row g-4">
            <c:forEach var="room" items="${featuredRooms}">
                <div class="col-md-6 col-lg-4">
                    <div class="glass-card h-100 overflow-hidden d-flex flex-direction-column">
                        <img src="${room.imageUrl}" class="card-img-top" alt="${room.name}" style="height: 220px; object-fit: cover;">
                        <div class="p-4 d-flex flex-column flex-grow-1">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="badge bg-dark border border-secondary text-info">${room.type}</span>
                                <span class="badge badge-status-${room.status}">${room.status}</span>
                            </div>
                            <h5 class="fw-bold text-white mb-1">${room.name}</h5>
                            <p class="text-secondary small mb-3 flex-grow-1">${room.description}</p>
                            
                            <div class="d-flex align-items-center justify-content-between pt-3 border-top border-secondary border-opacity-25 mt-auto">
                                <div>
                                    <span class="fs-4 fw-bold text-primary">$<fmt:formatNumber value="${room.pricePerNight}" pattern="#,##0.00"/></span>
                                    <span class="text-secondary small"> / night</span>
                                </div>
                                <a href="${pageContext.request.contextPath}/guest/rooms" class="btn btn-gradient btn-sm rounded-pill px-3">
                                    Book Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </c:forEach>
        </div>
    </div>
</section>

<!-- Features Grid -->
<section class="py-5" style="background: rgba(15, 23, 42, 0.5);">
    <div class="container">
        <div class="row g-4 text-center">
            <div class="col-md-4">
                <div class="glass-card p-4 h-100">
                    <div class="stat-icon-wrapper bg-primary bg-opacity-20 text-primary mx-auto mb-3">
                        <i class="fa-solid fa-bolt fs-4"></i>
                    </div>
                    <h5 class="fw-bold text-white">Real-Time Booking</h5>
                    <p class="text-secondary small mb-0">Instant reservation confirmation with dynamic Hibernate-backed persistence.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="glass-card p-4 h-100">
                    <div class="stat-icon-wrapper bg-info bg-opacity-20 text-info mx-auto mb-3">
                        <i class="fa-solid fa-shield-halved fs-4"></i>
                    </div>
                    <h5 class="fw-bold text-white">Role-Based Access</h5>
                    <p class="text-secondary small mb-0">Dedicated portals for Guests, Receptionists, and Hotel Administrators.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="glass-card p-4 h-100">
                    <div class="stat-icon-wrapper bg-success bg-opacity-20 text-success mx-auto mb-3">
                        <i class="fa-solid fa-bell-concierge fs-4"></i>
                    </div>
                    <h5 class="fw-bold text-white">24/7 Guest Services</h5>
                    <p class="text-secondary small mb-0">Direct room service, housekeeping, and maintenance request tracking.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<jsp:include page="common/footer.jsp" />
