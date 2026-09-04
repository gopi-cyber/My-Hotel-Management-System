<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>

<jsp:include page="../common/header.jsp" />
<jsp:include page="../common/navbar.jsp" />

<div class="container-fluid px-lg-5 py-4 flex-grow-1">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary border-opacity-25">
        <div>
            <h2 class="fw-bold text-white mb-1"><i class="fa-solid fa-gauge-high text-warning me-2"></i>Executive Administration Console</h2>
            <p class="text-secondary mb-0">System-wide monitoring, inventory controls, staff directory, and financial metrics.</p>
        </div>
        <div class="d-flex gap-2">
            <button class="btn btn-gradient rounded-pill px-3" data-bs-toggle="modal" data-bs-target="#addRoomModal">
                <i class="fa-solid fa-plus me-1"></i> Add New Room
            </button>
            <button class="btn btn-outline-info rounded-pill px-3" data-bs-toggle="modal" data-bs-target="#addStaffModal">
                <i class="fa-solid fa-user-plus me-1"></i> Add Staff
            </button>
        </div>
    </div>

    <!-- KPI Metric Cards -->
    <div class="row g-3 mb-4">
        <div class="col-sm-6 col-xl-3">
            <div class="glass-card p-4">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="text-secondary small fw-semibold">Total Revenue</span>
                        <h3 class="fw-bold text-success mb-0">$<fmt:formatNumber value="${stats.totalRevenue}" pattern="#,##0.00"/></h3>
                    </div>
                    <div class="stat-icon-wrapper bg-success bg-opacity-20 text-success">
                        <i class="fa-solid fa-dollar-sign fs-4"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-xl-3">
            <div class="glass-card p-4">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="text-secondary small fw-semibold">Total Rooms / Available</span>
                        <h3 class="fw-bold text-primary mb-0">${stats.totalRooms} <span class="fs-6 text-info">(${stats.availableRooms} free)</span></h3>
                    </div>
                    <div class="stat-icon-wrapper bg-primary bg-opacity-20 text-primary">
                        <i class="fa-solid fa-bed fs-4"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-xl-3">
            <div class="glass-card p-4">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="text-secondary small fw-semibold">Occupancy Rate</span>
                        <h3 class="fw-bold text-warning mb-0">${stats.occupancyRate}</h3>
                    </div>
                    <div class="stat-icon-wrapper bg-warning bg-opacity-20 text-warning">
                        <i class="fa-solid fa-chart-pie fs-4"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-xl-3">
            <div class="glass-card p-4">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <span class="text-secondary small fw-semibold">Active Staff</span>
                        <h3 class="fw-bold text-info mb-0">${stats.totalStaff}</h3>
                    </div>
                    <div class="stat-icon-wrapper bg-info bg-opacity-20 text-info">
                        <i class="fa-solid fa-users-gear fs-4"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Management Tabs -->
    <ul class="nav nav-pills mb-4 gap-2" id="adminTabs" role="tablist">
        <li class="nav-item">
            <button class="nav-link active rounded-pill px-4" id="rooms-tab" data-bs-toggle="pill" data-bs-target="#rooms-pane">
                <i class="fa-solid fa-door-open me-2"></i> Rooms Inventory (${rooms.size()})
            </button>
        </li>
        <li class="nav-item">
            <button class="nav-link rounded-pill px-4" id="staff-tab" data-bs-toggle="pill" data-bs-target="#staff-pane">
                <i class="fa-solid fa-id-card-clip me-2"></i> Staff Management (${staffList.size()})
            </button>
        </li>
        <li class="nav-item">
            <button class="nav-link rounded-pill px-4" id="bookings-tab" data-bs-toggle="pill" data-bs-target="#bookings-pane">
                <i class="fa-solid fa-calendar-days me-2"></i> All Bookings (${bookings.size()})
            </button>
        </li>
        <li class="nav-item">
            <button class="nav-link rounded-pill px-4" id="users-tab" data-bs-toggle="pill" data-bs-target="#users-pane">
                <i class="fa-solid fa-users me-2"></i> System Users (${users.size()})
            </button>
        </li>
    </ul>

    <div class="tab-content" id="adminTabsContent">
        <!-- Rooms Tab -->
        <div class="tab-pane fade show active" id="rooms-pane">
            <div class="glass-card p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="fw-bold text-white mb-0">Hotel Rooms & Inventory</h5>
                    <button class="btn btn-gradient btn-sm rounded-pill px-3" data-bs-toggle="modal" data-bs-target="#addRoomModal">
                        <i class="fa-solid fa-plus me-1"></i> Add Room
                    </button>
                </div>
                <div class="table-responsive">
                    <table class="table table-custom mb-0">
                        <thead>
                            <tr>
                                <th>Room #</th>
                                <th>Name & Type</th>
                                <th>Price/Night</th>
                                <th>Capacity</th>
                                <th>Status</th>
                                <th>Amenities</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <c:forEach var="r" items="${rooms}">
                                <tr>
                                    <td class="fw-bold text-info">Room ${r.roomNumber}</td>
                                    <td>
                                        <div class="fw-bold text-white">${r.name}</div>
                                        <div class="text-secondary small">${r.type}</div>
                                    </td>
                                    <td class="fw-bold text-primary">$<fmt:formatNumber value="${r.pricePerNight}" pattern="#,##0.00"/></td>
                                    <td>${r.capacity} Guests</td>
                                    <td><span class="badge badge-status-${r.status}">${r.status}</span></td>
                                    <td class="small text-secondary">${r.amenities}</td>
                                    <td>
                                        <form action="${pageContext.request.contextPath}/admin/rooms/delete/${r.id}" method="POST" onsubmit="return confirm('Delete this room?')">
                                            <button type="submit" class="btn btn-outline-danger btn-sm rounded-pill px-3">
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Staff Tab -->
        <div class="tab-pane fade" id="staff-pane">
            <div class="glass-card p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="fw-bold text-white mb-0">Hotel Staff Directory</h5>
                    <button class="btn btn-outline-info btn-sm rounded-pill px-3" data-bs-toggle="modal" data-bs-target="#addStaffModal">
                        <i class="fa-solid fa-user-plus me-1"></i> Add Staff Member
                    </button>
                </div>
                <div class="table-responsive">
                    <table class="table table-custom mb-0">
                        <thead>
                            <tr>
                                <th>Staff Name</th>
                                <th>Department & Role</th>
                                <th>Contact</th>
                                <th>Shift</th>
                                <th>Salary</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <c:forEach var="s" items="${staffList}">
                                <tr>
                                    <td class="fw-bold text-white">${s.name}</td>
                                    <td>
                                        <div class="text-info fw-semibold">${s.role}</div>
                                        <div class="text-secondary small">${s.department}</div>
                                    </td>
                                    <td class="small text-secondary">${s.email}<br>${s.phone}</td>
                                    <td><span class="badge bg-dark border border-secondary text-white">${s.shift}</span></td>
                                    <td class="fw-bold text-success">$<fmt:formatNumber value="${s.salary}" pattern="#,##0.00"/></td>
                                    <td><span class="badge ${s.status eq 'Active' ? 'bg-success' : 'bg-secondary'}">${s.status}</span></td>
                                    <td>
                                        <form action="${pageContext.request.contextPath}/admin/staff/delete/${s.id}" method="POST" onsubmit="return confirm('Delete this staff member?')">
                                            <button type="submit" class="btn btn-outline-danger btn-sm rounded-pill px-3">
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Bookings Tab -->
        <div class="tab-pane fade" id="bookings-pane">
            <div class="glass-card p-4">
                <h5 class="fw-bold text-white mb-3">All System Reservations</h5>
                <div class="table-responsive">
                    <table class="table table-custom mb-0">
                        <thead>
                            <tr>
                                <th>Ref #</th>
                                <th>Guest</th>
                                <th>Room</th>
                                <th>Dates</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <c:forEach var="b" items="${bookings}">
                                <tr>
                                    <td class="fw-bold text-info">${b.bookingReference}</td>
                                    <td>${b.guestName} (${b.guestEmail})</td>
                                    <td>Room ${b.roomNumber}</td>
                                    <td>${b.checkInDate} to ${b.checkOutDate}</td>
                                    <td class="fw-bold text-primary">$<fmt:formatNumber value="${b.totalAmount}" pattern="#,##0.00"/></td>
                                    <td><span class="badge bg-dark border border-secondary text-white">${b.status}</span></td>
                                    <td><span class="badge ${b.paymentStatus eq 'PAID' ? 'bg-success' : 'bg-warning text-dark'}">${b.paymentStatus}</span></td>
                                </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Users Tab -->
        <div class="tab-pane fade" id="users-pane">
            <div class="glass-card p-4">
                <h5 class="fw-bold text-white mb-3">Registered User Accounts</h5>
                <div class="table-responsive">
                    <table class="table table-custom mb-0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            <c:forEach var="u" items="${users}">
                                <tr>
                                    <td>${u.id}</td>
                                    <td class="fw-bold text-info">${u.username}</td>
                                    <td class="text-white">${u.name}</td>
                                    <td>${u.email}</td>
                                    <td>${u.phone}</td>
                                    <td><span class="badge ${u.role.name() eq 'ADMIN' ? 'bg-warning text-dark' : (u.role.name() eq 'RECEPTIONIST' ? 'bg-info text-dark' : 'bg-secondary')}">${u.role}</span></td>
                                </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Add Room Modal -->
<div class="modal fade" id="addRoomModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content glass-card text-white border border-secondary">
            <div class="modal-header border-secondary border-opacity-25">
                <h5 class="modal-title fw-bold"><i class="fa-solid fa-plus-circle text-primary me-2"></i>Add New Hotel Room</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <form action="${pageContext.request.contextPath}/admin/rooms/add" method="POST">
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label text-secondary small fw-semibold">Room Number</label>
                            <input type="text" name="roomNumber" class="form-control form-control-custom" placeholder="301" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small fw-semibold">Capacity</label>
                            <input type="number" name="capacity" class="form-control form-control-custom" value="2" min="1" max="10" required>
                        </div>
                        <div class="col-12">
                            <label class="form-label text-secondary small fw-semibold">Room Name</label>
                            <input type="text" name="name" class="form-control form-control-custom" placeholder="Royal Penthouse Suite" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small fw-semibold">Room Type</label>
                            <select name="type" class="form-select form-select-custom" required>
                                <option value="Standard">Standard</option>
                                <option value="Deluxe Suite">Deluxe Suite</option>
                                <option value="Executive">Executive</option>
                                <option value="Penthouse">Penthouse</option>
                                <option value="Family Suite">Family Suite</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small fw-semibold">Price Per Night ($)</label>
                            <input type="number" step="0.01" name="pricePerNight" class="form-control form-control-custom" placeholder="250.00" required>
                        </div>
                        <div class="col-12">
                            <label class="form-label text-secondary small fw-semibold">Amenities (Comma-separated)</label>
                            <input type="text" name="amenities" class="form-control form-control-custom" placeholder="WiFi, King Bed, Jacuzzi, Balcony, Mini Bar">
                        </div>
                        <div class="col-12">
                            <label class="form-label text-secondary small fw-semibold">Image URL</label>
                            <input type="text" name="imageUrl" class="form-control form-control-custom" placeholder="https://images.unsplash.com/photo-..." value="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800">
                        </div>
                        <div class="col-12">
                            <label class="form-label text-secondary small fw-semibold">Description</label>
                            <textarea name="description" class="form-control form-control-custom" rows="2" placeholder="Luxury ocean-facing suite..."></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-secondary border-opacity-25">
                    <button type="button" class="btn btn-outline-light rounded-pill" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-gradient rounded-pill px-4">Save Room</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Add Staff Modal -->
<div class="modal fade" id="addStaffModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content glass-card text-white border border-secondary">
            <div class="modal-header border-secondary border-opacity-25">
                <h5 class="modal-title fw-bold"><i class="fa-solid fa-user-plus text-info me-2"></i>Add Staff Member</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <form action="${pageContext.request.contextPath}/admin/staff/add" method="POST">
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label text-secondary small fw-semibold">Full Name</label>
                            <input type="text" name="name" class="form-control form-control-custom" placeholder="Alice Walker" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small fw-semibold">Email</label>
                            <input type="email" name="email" class="form-control form-control-custom" placeholder="alice@luxestay.com" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small fw-semibold">Phone</label>
                            <input type="text" name="phone" class="form-control form-control-custom" placeholder="+1 555-0205" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small fw-semibold">Role / Title</label>
                            <input type="text" name="role" class="form-control form-control-custom" placeholder="Front Desk Officer" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small fw-semibold">Department</label>
                            <select name="department" class="form-select form-select-custom" required>
                                <option value="Reception">Reception</option>
                                <option value="Housekeeping">Housekeeping</option>
                                <option value="Kitchen">Kitchen & Dining</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Management">Management</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small fw-semibold">Shift</label>
                            <select name="shift" class="form-select form-select-custom">
                                <option value="Morning">Morning (8 AM - 4 PM)</option>
                                <option value="Evening">Evening (4 PM - 12 AM)</option>
                                <option value="Night">Night (12 AM - 8 AM)</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small fw-semibold">Monthly Salary ($)</label>
                            <input type="number" step="0.01" name="salary" class="form-control form-control-custom" placeholder="4000.00" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label text-secondary small fw-semibold">Status</label>
                            <select name="status" class="form-select form-select-custom">
                                <option value="Active">Active</option>
                                <option value="On Leave">On Leave</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-secondary border-opacity-25">
                    <button type="button" class="btn btn-outline-light rounded-pill" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-gradient rounded-pill px-4">Save Staff</button>
                </div>
            </form>
        </div>
    </div>
</div>

<jsp:include page="../common/footer.jsp" />
